import React from "react";

export default function Navbar({ current, setCurrent }) {
  const menus = ["Tutor", "Flashcards", "Quiz", "Notes", "Calculator", "Planner"];
  return (
    <nav className="bg-blue-700 text-white flex justify-around py-3 font-semibold">
      {menus.map((m) => (
        <button
          key={m}
          onClick={() => setCurrent(m)}
          className={`px-3 py-1 rounded ${current === m ? "bg-blue-900" : ""}`}
        >
          {m}
        </button>
      ))}
    </nav>
  );
}
