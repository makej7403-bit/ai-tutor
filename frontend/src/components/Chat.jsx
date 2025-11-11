// AI Chat Fetch Function
const sendMessage = async (userInput) => {
  try {
    const response = await fetch("https://ai-tutor-e5m3.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    if (data.reply) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't get an answer." },
      ]);
    }
  } catch (error) {
    console.error("Error communicating with backend:", error);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Server error. Please try again later." },
    ]);
  }
};
