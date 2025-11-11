import React, { useState } from "react";

const flashcards = {
  Biology: [
    { question: "What is biology?", answer: "The study of living organisms." },
    { question: "What is a cell?", answer: "The basic unit of life." },
  ],
  Chemistry: [
    { question: "What is an atom?", answer: "The smallest unit of an element." },
    { question: "What is H2O?", answer: "Water — two hydrogen atoms and one oxygen atom." },
  ],
};

export default function Flashcards({ subject }) {
  const cards = flashcards[subject] || [];
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const next = () => { setShowAnswer(false); setIndex((index + 1) % cards.length); };
  if (!cards.length) return <p>No flashcards available for this subject.</p>;
  return (
    <div className="p-4 mt-3 border rounded-lg">
      <h2 className="font-semibold text-lg">Flashcards - {subject}</h2>
      <p className="mt-2">{showAnswer ? cards[index].answer : cards[index].question}</p>
      <button onClick={() => setShowAnswer(!showAnswer)} className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      <button onClick={next} className="ml-2 bg-green-500 text-white px-3 py-1 rounded">Next</button>
    </div>
  );
}
