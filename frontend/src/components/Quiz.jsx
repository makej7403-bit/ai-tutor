import React, { useState } from "react";

const sampleQuiz = {
  Biology: [
    { q: "What is the powerhouse of the cell?", a: "Mitochondria" },
    { q: "What carries oxygen in blood?", a: "Hemoglobin" },
  ],
};

export default function Quiz({ subject }) {
  const quiz = sampleQuiz[subject] || [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);

  const check = () => {
    if (answer.trim().toLowerCase() === quiz[index].a.toLowerCase()) setScore(score + 1);
    if (index + 1 === quiz.length) setDone(true);
    else setIndex(index + 1);
    setAnswer("");
  };

  if (!quiz.length) return <p>No quiz yet for {subject}</p>;

  return (
    <div className="p-4 border mt-3 rounded-lg">
      {!done ? (
        <>
          <h3>{quiz[index].q}</h3>
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="border p-2 mt-2 rounded" />
          <button onClick={check} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">Submit</button>
        </>
      ) : (
        <h3>Your score: {score}/{quiz.length}</h3>
      )}
    </div>
  );
}
