import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';

initializeApp();

export const createGamble = onSchedule('every minute', async () => {
	const serverTime = Timestamp.now();

	await getFirestore()
		.collection('gambles')
		.add({
			date: serverTime,
			totalPlayers: 0,
			totalSilver: 0,
			users: [{ userNickname: '', balanceDrop: 0 }]
		});
});
