import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCAb1hJCrP2O7tlb8y8ELs1GpqceX6tLmc',
	authDomain: 'appointments-13f87.firebaseapp.com',
	databaseURL: 'https://appointments-13f87-default-rtdb.firebaseio.com',
	projectId: 'appointments-13f87',
	storageBucket: 'appointments-13f87.appspot.com',
	messagingSenderId: '1087260838438',
	appId: '1:1087260838438:web:bb3dc3c5f2daa5dc2874e7',
};

initializeApp(firebaseConfig);

const db = getFirestore();

const collectionAppointments = collection(db, 'appointments');

const collectionArchive = query(collectionAppointments, where('confirm', '==', 'false'), orderBy('createdAt', 'desc'));

const collectionCurrent = query(
	collectionAppointments,
	where('confirm', 'in', ['true', 'unknown']),
	orderBy('createdAt', 'desc')
);

const auth = getAuth();

export { collectionAppointments, collectionArchive, collectionCurrent, auth, db };
