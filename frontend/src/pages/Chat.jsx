import React, { useState } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);

    const res = await fetch("https://ai-tutor-e5m3.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply || "No reply." };
    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 rounded-xl shadow-xl p-6 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">AI Chat Assistant</h2>
      <div className="h-80 overflow-y-auto border p-4 rounded-md bg-gray-50 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <p className={`inline-block px-3 py-2 rounded-xl ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
              {m.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-grow p-3 border rounded-lg"
        />
        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
