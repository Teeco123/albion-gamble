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
	limit
} from 'firebase/firestore';
import { Cron } from 'croner';
import { Chance } from 'chance';
import { pusherServer } from '$lib/pusher/server';

async function CreateGamble() {
	let serverTime = serverTimestamp();
	await addDoc(collection(firestore, 'gambles'), {
		date: serverTime,
		totalPlayers: 1,
		totalSilver: 0,
		users: [{ userNickname: '', balanceDrop: 0.00000000000000000000000000000000001 }]
	});
}

async function SpinWheel() {
	let chance = new Chance();
	let gambleData: any;
	let users = new Array();
	let silver = new Array();

	const gambleQuery = query(collection(firestore, 'gambles'), orderBy('date', 'desc'), limit(1));
	const gambleSnapshot = await getDocs(gambleQuery);
	gambleSnapshot.forEach((gambleDoc) => {
		gambleData = gambleDoc.data();
	});

	for (let x = 0; x < gambleData.totalPlayers; x++) {
		users.push(gambleData.users[x].userNickname);
		silver.push(gambleData.users[x].balanceDrop);
	}

	const winner = chance.weighted(users, silver);

	pusherServer.trigger('channel', 'event', {});
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
