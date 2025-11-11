import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loadProgress } from "../firestore";

export default function ProgressWidget() {
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, u => {
    setUser(u);
    if (u) loadProgress(u.uid).then(p => setProgress(p || {}));
  }), []);

  return (
    <div className="card">
      <h4 className="font-semibold">Your Progress</h4>
      {user ? (
        <pre className="text-sm mt-2">{JSON.stringify(progress, null, 2)}</pre>
      ) : (
        <p className="text-sm text-gray-500">Sign in to see progress tracking.</p>
      )}
    </div>
  );
}
