import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="grid gap-8 place-items-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-3">FullTask AI Tutor</h1>
        <p className="text-lg text-gray-600">Smart AI for Biology, Chemistry, and Nursing — study, quiz, and practice with confidence.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/biology" className="px-6 py-3 bg-green-600 text-white rounded-lg">Biology</Link>
          <Link to="/chemistry" className="px-6 py-3 bg-red-600 text-white rounded-lg">Chemistry</Link>
          <Link to="/nursing" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Nursing</Link>
        </div>
      </div>

      <div className="card w-full max-w-3xl">
        <h3 className="text-2xl font-semibold mb-2">Live AI Chat (embed your backend)</h3>
        <iframe title="ai-backend" src={import.meta.env.VITE_API_BASE || "https://ai-tutor-e5m3.onrender.com"} className="w-full h-64 border rounded-md" />
        <p className="mt-2 text-sm text-gray-500">If the iframe shows an error, open the Chat page instead.</p>
      </div>
    </div>
  );
}
