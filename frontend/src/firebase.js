// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7cAN-mrE2PvmlQ11zLKAdHBhN7nUFjHw",
  authDomain: "fir-u-c-students-web.firebaseapp.com",
  databaseURL: "https://fir-u-c-students-web-default-rtdb.firebaseio.com",
  projectId: "fir-u-c-students-web",
  storageBucket: "fir-u-c-students-web.firebasestorage.app",
  messagingSenderId: "113569186739",
  appId: "1:113569186739:web:d8daf21059f43a79e841c6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase modules
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// --- 🔐 Authentication helpers ---
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Signed in:", result.user.displayName);
    return result.user;
  } catch (error) {
    console.error("❌ Sign-in failed:", error);
    throw error;
  }
}

export function signOutUser() {
  return signOut(auth);
}

// --- 💾 Firestore: Save and Load History ---
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
  console.log("✅ History saved:", doc.id);
  return doc.id;
}

export async function loadHistory(uid) {
  if (!uid) return [];
  const histCol = collection(db, "histories");
  const q = query(histCol, where("uid", "==", uid), orderBy("ts", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
