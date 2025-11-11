import React from "react";

export default function AuthWidget(){
  // Stub for Google Sign-in (extend with Firebase)
  return (
    <div style={{marginTop:12}} className="card">
      <h4>Account</h4>
      <button onClick={()=>alert("Google Sign-In stub — implement Firebase Auth")}>Sign in with Google</button>
    </div>
  );
}
