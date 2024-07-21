import { firestore } from '$lib/firebase/server';
import type { Handle } from '@sveltejs/kit';
import {
	collection,
	getDocs,
	query,
	where,
	addDoc,
	serverTimestamp,
	orderBy,
	limit,
	setDoc,
	doc
} from 'firebase/firestore';
import { Cron } from 'croner';
import { pusherServer } from '$lib/pusher/server';

async function CreateGamble() {
	let serverTime = serverTimestamp();
	await addDoc(collection(firestore, 'gambles'), {
		date: serverTime,
		isSpinning: false,
		totalPlayers: 1,
		totalSilver: 0,
		users: [{ userNickname: '', balanceDrop: 0.00000000000000000000000000000000001 }]
	});

	pusherServer.trigger('wheelOfFortune', 'CreateGamble', {});
}

async function SpinWheel() {
	let gambleData: any;
	let gambleId: any;
	let users = new Array();
	let silver = new Array();

	const gambleQuery = query(collection(firestore, 'gambles'), orderBy('date', 'desc'), limit(1));
	const gambleSnapshot = await getDocs(gambleQuery);
	gambleSnapshot.forEach((gambleDoc) => {
		gambleId = gambleDoc.id;
		gambleData = gambleDoc.data();
	});

	// Extract users and weights (assuming balanceDrop represents weight)
	for (let x = 0; x < gambleData.totalPlayers; x++) {
		users.push({ name: gambleData.users[x].userNickname, weight: gambleData.users[x].balanceDrop });
		silver.push(gambleData.users[x].balanceDrop);
	}

	// Function to determine winner using crypto randomness
	function determineWinnerWithWeight(users: any) {
		// Calculate the total weight
		const totalWeight = users.reduce((acc: any, user: any) => acc + user.weight, 0);

		// Generate a cryptographically secure random number
		const randomBuffer = new Uint32Array(1);
		crypto.getRandomValues(randomBuffer);
		const randomNumber = (randomBuffer[0] / (0xffffffff + 1)) * totalWeight; // Normalize to 0-totalWeight range

		// Find the winner
		let accumulatedWeight = 0;
		for (let i = 0; i < users.length; i++) {
			accumulatedWeight += users[i].weight;
			if (accumulatedWeight >= randomNumber) {
				return i; // Return the winner's name
			}
		}

		// Handle the unlikely case where the loop finishes without finding a winner
		return users[users.length - 1].name; // Return the last user's name as a fallback
	}

	// Determine the winner
	const winnerIndex = determineWinnerWithWeight(users);
	const winnerName = users[winnerIndex].name;
	const winnerSilver = users[winnerIndex].weight;

	console.log(winnerIndex, winnerName, winnerSilver);
	// Send notification or perform further actions based on the winner
	if (winnerIndex != 0) {
		setDoc(doc(firestore, 'gambles', gambleId), { isSpinning: true }, { merge: true });
		pusherServer.trigger('wheelOfFortune', 'SpinWheel', {
			winnerIndex: winnerIndex,
			winnerName: winnerName,
			winnerSilver: winnerSilver
		});
	}
	setDoc(doc(firestore, 'gambles', gambleId), { isSpinning: true }, { merge: true });
}

Cron('* * * * *', () => {
	CreateGamble();
});

Cron('45 * * * * *', () => {
	SpinWheel();
});

export const handle: Handle = async ({ event, resolve }) => {
	let sessionId = event.cookies.get('sessionId');

	if (sessionId == undefined) {
		sessionId = '';
	}

	let userData;
	const userDataQuery = query(collection(firestore, 'users'), where('sessionId', '==', sessionId));
	const userDataSnapshot = await getDocs(userDataQuery);
	userDataSnapshot.forEach((doc) => {
		userData = doc.data();
	});

	if (userData) {
		event.locals.user = {
			//@ts-expect-error property does not exists on type never
			username: userData.username,
			//@ts-expect-error property does not exists on type never
			server: userData.server
		};
	}

	const response = await resolve(event);
	return response;
};
