import { firestore } from '$lib/firebase/server';
import type { Handle } from '@sveltejs/kit';
import {
	collection,
	getDocs,
	query,
	where,
	Timestamp,
	addDoc,
	serverTimestamp
} from 'firebase/firestore';
import { Cron } from 'croner';

async function CreateGamble() {
	let serverTime = serverTimestamp();
	await addDoc(collection(firestore, 'gambles'), {
		date: serverTime,
		totalPlayers: 0,
		totalSilver: 0,
		users: [{ userNickname: '', balanceDrop: 0.00000000000000000000000000000000001 }]
	});
}
Cron('* * * * *', () => {
	CreateGamble();
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
