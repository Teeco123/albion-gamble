import { onSchedule } from 'firebase-functions/v2/scheduler';

exports.createFile = onSchedule('every minute', async () => {
	console.log('hello world');
});
