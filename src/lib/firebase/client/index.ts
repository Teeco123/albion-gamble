import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { env } from '$env/dynamic/public';

const firebaseConfig = {
	apiKey: env.PUBLIC_FIREBASE_API_KEY,
	authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: env.PUBLIC_FIREBASE_APP_ID,
	measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
