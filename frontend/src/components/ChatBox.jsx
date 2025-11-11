import React, { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    // Call AI API
    const res = await fetch('https://your-backend-url.onrender.com/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
  }

  return (
    <div className="flex flex-col h-full bg-white/5 rounded-xl p-4 shadow-inner">
      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'ml-auto bg-cyan-700' : 'bg-gray-700'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 bg-transparent border border-gray-500 rounded-l px-3 py-2 outline-none"
          placeholder="Ask AI about Nursing, Biology, Chemistry..."
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-600 px-4 py-2 rounded-r hover:bg-cyan-700 font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
