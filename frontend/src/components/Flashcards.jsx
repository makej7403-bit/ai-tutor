import React, { useState } from "react";

const Flashcards = ({ subject }) => {
  const [cards, setCards] = useState([
    { question: "What is biology?", answer: "The study of living organisms." },
    { question: "What is photosynthesis?", answer: "The process by which green plants make food using sunlight." },
  ]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="font-bold text-xl mb-2">Flashcards - {subject}</h2>
      <p className="text-lg">{showAnswer ? cards[index].answer : cards[index].question}</p>
      <div className="mt-4 flex justify-center gap-3">
        <button onClick={() => setShowAnswer(!showAnswer)} className="bg-blue-600 text-white px-3 py-1 rounded">
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
        <button onClick={nextCard} className="bg-green-600 text-white px-3 py-1 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
