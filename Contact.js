import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Secure API key
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`, // Correct format
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { sender: "bot", text: aiResponse },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { sender: "bot", text: "Sorry, I couldn't process your request." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="contact-container">
      <h2>Chat with Our AI Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Contact;
