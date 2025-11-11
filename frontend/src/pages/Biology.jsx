import React from "react";
import { Link } from "react-router-dom";

export default function Biology(){
  return (
    <div className="grid gap-6">
      <div className="card">
        <h2 className="text-2xl font-semibold">Biology Tutor</h2>
        <p className="text-sm text-gray-600">Ask questions about cells, anatomy, physiology and more.</p>
        <div className="mt-4 flex gap-2">
          <Link to="/chat" className="px-3 py-2 bg-green-600 text-white rounded">Ask AI (Biology)</Link>
          <button className="px-3 py-2 border rounded">Practice Quiz</button>
          <button className="px-3 py-2 border rounded">Flashcards</button>
        </div>
      </div>

      <div className="card">
        <h4 className="font-semibold">Sample Topic: Cell Structure</h4>
        <p className="text-sm text-gray-600">Click "Ask AI" to request a tailored lesson and read-aloud explanation.</p>
      </div>
    </div>
  );
}
