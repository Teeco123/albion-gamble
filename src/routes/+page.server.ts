import { collection, getDocs, query, where } from 'firebase/firestore';

import { firestore } from '$lib/firebase';

export const load = async ({ cookies }) => {
	let sessionId = cookies.get('sessionId');

	if (sessionId == null) {
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
