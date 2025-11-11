// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";

// Vite env variables (set these in Render or .env.local)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// helper functions
export async function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}
export function signOutUser() {
  return signOut(auth);
}

// save Q/A to Firestore under collection "histories"
export async function saveHistory(uid, subject, question, answer) {
  if (!uid) return null;
  const col = collection(db, "histories");
  const doc = await addDoc(col, {
    uid,
    subject,
    question,
    answer,
    ts: Date.now(),
  });
  return doc.id;
}

// fetch last N histories for a user
export async function loadHistory(uid, limit = 50) {
  if (!uid) return [];
  const histCol = collection(db, "histories");
  const q = query(histCol, where("uid", "==", uid), orderBy("ts", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
