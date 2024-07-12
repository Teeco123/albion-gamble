import { firestore } from '$lib/firebase.js';
import { query, collection, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const server = data.get('server');

		let userData;
		const userQuery = query(
			collection(firestore, 'users'),
			where('username', '==', username),
			where('server', '==', server)
		);
		const userSnapshot = await getDocs(userQuery);
		userSnapshot.forEach((userDoc) => {
			userData = userDoc.data();
		});

		if (!userData && password && username) {
			await addDoc(collection(firestore, 'users'), {
				username: username,
				password: password,
				server: server,
				dateJoined: serverTimestamp(),
				balance: 0
			});
		}
	}
};