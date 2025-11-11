// src/components/AuthWidget.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { signInWithGoogle, signOutUser } from "../firebase";

export default function AuthWidget() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (e) {
      console.error("Sign-in failed", e);
      alert("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOutUser();
    } catch (e) {
      console.error("Sign-out failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 12 }} className="card">
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={user.photoURL} alt="avatar" style={{ width: 40, height: 40, borderRadius: 20 }} />
          <div>
            <div style={{ fontWeight: 600 }}>{user.displayName}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{user.email}</div>
            <div style={{ marginTop: 6 }}>
              <button onClick={handleSignOut} className="btn-small">Sign out</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ fontWeight: 600 }}>Account</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={handleSignIn} disabled={loading} className="btn">
              {loading ? "Please wait..." : "Sign in with Google"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
