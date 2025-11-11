import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// You provided these keys earlier; safe to keep client-side for Firebase Auth.
// If you prefer, move these to Vite env vars and reference import.meta.env.VITE_FIREBASE_...
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC7cAN-mrE2PvmlQ11zLKAdHBhN7nUFjHw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fir-u-c-students-web.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://fir-u-c-students-web-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-u-c-students-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fir-u-c-students-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "113569186739",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:113569186739:web:d8daf21059f43a79e841c6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;

import { db } from "./firebase";
import { doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

/**
 * Save chat message list for a user (overwrites)
 * path: users/{uid}/chats/{chatId}  (chatId can be 'default')
 */
export async function saveChat(uid, chatId = "default", messages = []) {
  if (!uid) return;
  const docRef = doc(db, "users", uid, "chats", chatId);
  await setDoc(docRef, { messages, updatedAt: new Date().toISOString() });
}

/** Load chat */
export async function loadChat(uid, chatId = "default") {
  if (!uid) return null;
  const docRef = doc(db, "users", uid, "chats", chatId);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data().messages : [];
}

/** Save progress object {subject: {score, completed}} */
export async function saveProgress(uid, progress) {
  if (!uid) return;
  const docRef = doc(db, "users", uid, "meta", "progress");
  await setDoc(docRef, { progress, updatedAt: new Date().toISOString() });
}

/** Load progress */
export async function loadProgress(uid) {
  if (!uid) return {};
  const docRef = doc(db, "users", uid, "meta", "progress");
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data().progress : {};
}
