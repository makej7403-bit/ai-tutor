import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">FullTask AI Tutor</h1>
      <p className="text-gray-700 text-lg mb-8">
        Learn <span className="font-semibold">Biology, Chemistry</span>, and <span className="font-semibold">Nursing</span> with Smart AI.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <Link to="/biology" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md text-lg">
          Biology
        </Link>
        <Link to="/chemistry" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-md text-lg">
          Chemistry
        </Link>
        <Link to="/nursing" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md text-lg">
          Nursing
        </Link>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ask your AI Tutor anything 👇</h3>
      <iframe
        src="https://ai-tutor-e5m3.onrender.com"
        className="w-full max-w-2xl h-[500px] border rounded-xl shadow-lg"
        title="AI Tutor Chat"
      />
    </div>
  );
}
