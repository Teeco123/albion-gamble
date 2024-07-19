import { firestore } from '$lib/firebase/server';
import { redirect } from '@sveltejs/kit';
import { query, collection, where, getDocs, setDoc, doc } from 'firebase/firestore';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const server = data.get('server');

		if (!username || !password || !server) {
			return;
		}

		let userData;
		let userId = '';
		const userQuery = query(
			collection(firestore, 'users'),
			where('username', '==', username),
			where('server', '==', server),
			where('password', '==', password)
		);
		const userSnapshot = await getDocs(userQuery);
		userSnapshot.forEach((userDoc) => {
			userData = userDoc.data();
			userId = userDoc.id;
		});

		if (!userData) {
			return;
		}

		if (userData) {
			const sessionId = crypto.randomUUID();

			setDoc(doc(firestore, 'users', userId), { sessionId: sessionId }, { merge: true });
			cookies.set('sessionId', sessionId, {
				path: '/',
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24 * 1
			});
			throw redirect(302, '/');
		}
	}
};
