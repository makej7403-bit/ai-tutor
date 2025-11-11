import React, { useEffect, useState } from "react";

export default function AdminPanel(){
  const [health, setHealth] = useState(null);
  useEffect(()=> {
    fetch(`${import.meta.env.VITE_API_BASE || "https://ai-tutor-e5m3.onrender.com"}/api/admin/health`)
      .then(r=>r.json()).then(setHealth).catch(()=>setHealth({ok:false}));
  },[]);
  return (
    <div>
      <div className="card">
        <h3>Admin Panel</h3>
        <div>Backend health: {health ? (health.ok ? "OK" : "Not OK") : "Loading..."}</div>
      </div>
      <div className="card">
        <h4>Usage & Logs</h4>
        <div>Placeholder for analytics and OpenAI billing info.</div>
      </div>
    </div>
  );
}
