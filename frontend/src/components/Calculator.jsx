import React, { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg">🧮 Calculator</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter math expression..."
        className="border p-2 rounded w-3/4 mt-2"
      />
      <button onClick={calculate} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">
        Calculate
      </button>
      <p className="mt-3 text-lg">Result: {result}</p>
    </div>
  );
}
