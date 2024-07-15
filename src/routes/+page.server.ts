import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	addDoc,
	serverTimestamp,
	orderBy,
	limit,
	setDoc,
	arrayUnion,
	increment
} from 'firebase/firestore';
import { firestore } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	let sessionId = cookies.get('sessionId');

	if (sessionId == undefined) {
		sessionId = '';
	}

	let userId;
	let userData;
	const userDataQuery = query(collection(firestore, 'users'), where('sessionId', '==', sessionId));

	const userSnapshot = await getDocs(userDataQuery);
	userSnapshot.forEach((doc) => {
		userId = doc.id;
	});

	return {
		sessionId: sessionId,
		userId: userId,
		userData: userData
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

		if (message) {
			let sessionId = cookies.get('sessionId');

			if (sessionId == undefined) {
				sessionId = '';
			}

			let userId;
			let userData;
			let userNickname;
			const userDataQuery = query(
				collection(firestore, 'users'),
				where('sessionId', '==', sessionId)
			);

			const userSnapshot = await getDocs(userDataQuery);
			userSnapshot.forEach((doc) => {
				userId = doc.id;
				userData = doc.data();
				userNickname = userData.username;
			});

			await addDoc(collection(firestore, 'messages'), {
				userId: userId,
				userNickname: userNickname,
				message: message,
				timeSent: serverTimestamp()
			});
		}
	},
	inputSilver: async ({ request, cookies }) => {
		const data = await request.formData();

		const silver = Number(data.get('silver'));

		let sessionId = cookies.get('sessionId');
		if (sessionId != undefined) {
			//Retrieve user info
			let userId: any;
			let userData: any;

			const userDataQuery = query(
				collection(firestore, 'users'),
				where('sessionId', '==', sessionId)
			);

			const userSnapshot = await getDocs(userDataQuery);
			userSnapshot.forEach((doc) => {
				userId = doc.id;
				userData = doc.data();
			});

			let newBalance = userData.balance - silver;
			if (newBalance >= 0 && silver > 0) {
				//Retrieve latest gamble info
				let gambleId: any;
				let gambleData: any;
				const gambleQuery = query(
					collection(firestore, 'gambles'),
					orderBy('date', 'desc'),
					limit(1)
				);
				const gambleSnapshot = await getDocs(gambleQuery);
				gambleSnapshot.forEach((gambleDoc) => {
					gambleId = gambleDoc.id;
					gambleData = gambleDoc.data();
				});

				//Update gamble doc with new info
				await setDoc(
					doc(firestore, 'gambles', gambleId),
					{
						users: arrayUnion({
							userId: userId,
							userNickname: userData.username,
							balanceDrop: Number(silver)
						}),
						totalPlayers: increment(1),
						totalSilver: Number(gambleData.totalSilver) + Number(silver)
					},
					{ merge: true }
				);

				//Update user balance
				await setDoc(
					doc(firestore, 'users', userId),
					{
						balance: newBalance
					},
					{ merge: true }
				);
			}
		} else {
			sessionId = '';
			return;
		}
	}
};
