// src/contexts/UserContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ user: null });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u ? { uid: u.uid, displayName: u.displayName, email: u.email, photoURL: u.photoURL } : null);
    });
    return () => unsub();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}
