import { firestore } from '$lib/firebase';
import type { Handle } from '@sveltejs/kit';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionId');

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
	} else {
		event.locals.user = {
			username: '',
			server: ''
		};
	}

	const response = await resolve(event);
	return response;
};
