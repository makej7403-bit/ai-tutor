import React, { useState } from "react";

export default function Flashcards(){
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  async function generate(){
    setLoading(true);
    setCards([]);
    try{
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "https://ai-tutor-e5m3.onrender.com"}/api/flashcards`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ subject:"General", text })
      });
      const data = await res.json();
      setCards(data.cards || []);
    }catch(err){ console.error(err); alert("Failed to generate flashcards"); }
    setLoading(false);
  }

  return (
    <div>
      <div className="card">
        <h3>Flashcard Generator</h3>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste notes or text..." />
        <button onClick={generate} disabled={loading}>{loading ? "Generating..." : "Create Flashcards"}</button>
      </div>

      {cards.length>0 && (
        <div className="card">
          <h4>Flashcards</h4>
          {cards.map((c,i)=>(<div key={i} style={{marginBottom:8}}><strong>{c.front}</strong><div>{c.back}</div></div>))}
        </div>
      )}
    </div>
  );
}
