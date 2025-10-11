import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ data }) => {
  return (
    <div className="conversation-card">
      <div className="ai-side">
        <img src="/public/男性.png" alt="AIアイコン" className="icon" />
        <div className="message">
          <div className="ai-output">{data.aiOutput}</div>
          <div className="meaning">{data.meaning}</div>
        </div>
      </div>

      <div className="user-side">
        <div className="user-input">{data.userInput}</div>
        <img
          src="/public/ユーザーアイコン(女).png"
          alt="ユーザーアイコン"
          className="icon"
        />
      </div>
    </div>
  );
};

export default ChatMessage;
