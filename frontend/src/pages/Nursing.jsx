import React from "react";
import ChatBox from "../components/ChatBox";

export default function Nursing(){ 
  return (
    <div>
      <h2 className="text-xl font-bold">Nursing Tutor</h2>
      <p className="text-sm text-red-600">Clinical disclaimer: this tool offers study help only — not medical or diagnostic advice.</p>
      <ChatBox subject="Nursing"/>
    </div>
  );
}
