import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	addDoc,
	serverTimestamp
} from 'firebase/firestore';
import { firestore } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	let sessionId = cookies.get('sessionId');

	if (sessionId == undefined) {
		sessionId = '';
	}

	let userId;
	const userDataQuery = query(collection(firestore, 'users'), where('sessionId', '==', sessionId));

	const userSnapshot = await getDocs(userDataQuery);
	userSnapshot.forEach((doc) => {
		userId = doc.id;
	});

	return {
		userId: userId
	};
};

export const actions = {
	logout: async ({ cookies }) => {
		let sessionId = cookies.get('sessionId');

		if (sessionId == undefined) {
			sessionId = '';
		}

		let userId;
		const userDataQuery = query(
			collection(firestore, 'users'),
			where('sessionId', '==', sessionId)
		);

		const userSnapshot = await getDocs(userDataQuery);
		userSnapshot.forEach((doc) => {
			userId = doc.id;
		});

		const userRef = doc(collection(firestore, 'users'), userId);

		await updateDoc(userRef, {
			sessionId: null
		});
		cookies.delete('sessionId', { path: '/' });
	},
	loginRedirect: async () => {
		redirect(302, '/login');
	},
	registerRedirect: async () => {
		redirect(302, '/register');
	},
	sendMessage: async ({ request, cookies }) => {
		const data = await request.formData();
		const message = data.get('message');

		let sessionId = cookies.get('sessionId');

		if (sessionId == undefined) {
			sessionId = '';
		}

		let userId;
		const userDataQuery = query(
			collection(firestore, 'users'),
			where('sessionId', '==', sessionId)
		);

		const userSnapshot = await getDocs(userDataQuery);
		userSnapshot.forEach((doc) => {
			userId = doc.id;
		});

		await addDoc(collection(firestore, 'messages'), {
			userId: userId,
			message: message,
			timeSent: serverTimestamp()
		});
	}
};
