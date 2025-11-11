import React, { useState, useEffect } from "react";

export default function Planner() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running && time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, running]);

  const format = (t) => `${Math.floor(t / 60)}:${("0" + (t % 60)).slice(-2)}`;

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg">🕒 Study Planner / Timer</h2>
      <p className="text-2xl mt-2">{format(time)}</p>
      <button onClick={() => setRunning(!running)} className="bg-green-600 text-white px-3 py-1 rounded mt-2">
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={() => setTime(25 * 60)} className="ml-2 bg-gray-500 text-white px-3 py-1 rounded">
        Reset
      </button>
    </div>
  );
}
