import 'firebase/firestore';

import firebase from 'firebase/app';

const db = firebase
	.initializeApp({
		apiKey: 'AIzaSyDHvNdVL40tKpS-bCOzCbtLVV1NCwm3BCA',
		authDomain: 'pai-servicario.firebaseapp.com',
		databaseURL: 'https://pai-servicario.firebaseio.com',
		projectId: 'pai-servicario',
		storageBucket: 'pai-servicario.appspot.com',
		messagingSenderId: '568783780616',
		appId: '1:568783780616:web:40447db6255285d6b64abd',
		measurementId: 'G-4SPSXNVFNX',
	})
	.firestore();

export default db;

const { Timestamp } = firebase.firestore;
export { Timestamp };
