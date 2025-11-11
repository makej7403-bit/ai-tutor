import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage(){
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (e) { alert("Login failed: " + e.message); }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="max-w-md mx-auto card">
      {!user ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
          <button onClick={login} className="flex items-center gap-3 px-4 py-2 border rounded-md w-full">
            <FcGoogle size={22}/> Sign in with Google
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl">Hello, {user.displayName}</h2>
          <img src={user.photoURL} alt="avatar" className="w-20 h-20 rounded-full my-4" />
          <div className="flex gap-2">
            <button onClick={()=>navigate('/dashboard')} className="px-4 py-2 bg-sky-600 text-white rounded-md">Go to Dashboard</button>
            <button onClick={logout} className="px-4 py-2 border rounded-md">Logout</button>
          </div>
        </>
      )}
    </div>
  );
}
