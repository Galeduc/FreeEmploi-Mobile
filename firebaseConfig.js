import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCb1jZ0Lr6L294ZJZZIpM3hrHMSAhSz3zM",
  authDomain: "freeemploi-e4e54.firebaseapp.com",
  projectId: "freeemploi-e4e54",
  storageBucket: "freeemploi-e4e54.appspot.com",
  messagingSenderId: "1098573266806",
  appId: "1:1098573266806:web:9d622595ba9fc8ead08457"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth, signInWithEmailAndPassword };