import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEw5xnBEMKWWiYq-PesNfOfHL3rvi4i3g",
  authDomain: "proyectonosql-3d12f.firebaseapp.com",
  projectId: "proyectonosql-3d12f",
  storageBucket: "proyectonosql-3d12f.firebasestorage.app",
  messagingSenderId: "829790247342",
  appId: "1:829790247342:web:b6c2fa7f02da7ccd33503f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };