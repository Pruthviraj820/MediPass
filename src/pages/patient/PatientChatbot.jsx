import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { GoogleGenAI } from "@google/genai";

import robotPfp from "./assets/images/robot.png";
import userPfp from "./assets/images/me.jpg";
import loadingGif from "./assets/images/loading-spinner.gif";

import "./PatientChatbot.css";
/* ---------------- GEMINI SETUP ---------------- */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function run(input) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: input,
  });
  return response.text;
}

/* ---------------- CHATBOT COMPONENT ---------------- */

export default function PatientChatbot() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatMessagesRef = useRef(null);

  /* -------- Persist messages -------- */
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  /* -------- Auto scroll -------- */
  useEffect(() => {
    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages.length]);

  /* -------- Handlers -------- */

  function saveMessage(e) {
    setInputText(e.target.value);
  }

  function keyPress(e) {
    if (e.key === "Enter") sendMessage();
    if (e.key === "Escape") setInputText("");
  }

  async function sendMessage() {
    if (inputText.trim() === "" || isLoading) return;

    const userMessage = {
      message: inputText,
      sender: "user",
      time: dayjs().format("h:mma"),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputText("");

    setChatMessages((prev) => [
      ...prev,
      { message: "", sender: "robot", loading: true, time: "" },
    ]);

    setIsLoading(true);

    const response = await run(inputText);

    setChatMessages((prev) => {
      const newChatMessages = prev.filter((msg) => !msg.loading);
      return [
        ...newChatMessages,
        {
          message: response,
          sender: "robot",
          time: dayjs().format("h:mma"),
        },
      ];
    });

    setIsLoading(false);
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="app-container">
      {/* Messages */}
      <div className="chat-messages-container" ref={chatMessagesRef}>
        {chatMessages.map(({ message, sender, time }, index) => (
          <div
            key={index}
            className={
              sender === "user" ? "chat-message-user" : "chat-message-robot"
            }
          >
            {sender === "robot" && (
              <img src={robotPfp} className="chat-message-profile" />
            )}

            <div className="chat-message-text time-user">
              {sender === "robot" && message === "" ? (
                <img src={loadingGif} className="loading-spinner" />
              ) : (
                message
              )}

              <p
                className={
                  "time " + (sender === "user" ? "time-user" : "time-robot")
                }
              >
                {time}
              </p>
            </div>

            {sender === "user" && (
              <img src={userPfp} className="chat-message-profile" />
            )}
          </div>
        ))}
      </div>

      {/* Welcome */}
      <div className="welcome-center">
        <p>{chatMessages.length === 0 ? "Welcome to my Chatbot" : ""}</p>
      </div>

      {/* Input */}
      <div className="chat-input-container">
        <input
          placeholder="Send a message to Chatbot"
          size="30"
          value={inputText}
          onChange={saveMessage}
          onKeyDown={keyPress}
          className="text-box"
        />

        <button
          onClick={sendMessage}
          disabled={isLoading || inputText.trim() === ""}
          className="button send-button"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>

        <button
          onClick={() => setChatMessages([])}
          className="button clear-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
