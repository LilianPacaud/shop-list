import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = Constants.expoConfig.extra.firebaseConfig;

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export { firestore };