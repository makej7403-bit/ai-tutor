import React from "react";

const Dashboard = () => {
  return (
    <div className="p-8 text-center bg-white/90 rounded-2xl shadow-lg backdrop-blur-md">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">AI Tutor Dashboard</h1>
      <p className="text-gray-700 text-lg mb-6">
        Welcome! Use the menu to start chatting, learning, or reading your lessons.
      </p>
      <button
        onClick={() => window.location.href = "/chat"}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
      >
        Go to Chat
      </button>
    </div>
  );
};

export default Dashboard;
