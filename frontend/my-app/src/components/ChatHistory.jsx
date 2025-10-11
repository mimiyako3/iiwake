import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatHistory = () => {
  const messages = [
    {
      id: 1,
      userInput: "寝坊しました。",
      aiOutput: "やんごとなき事情により、朝の光を拝むのが遅れました。",
      meaning: "（寝坊したけど上品に言ってる）",
    },
    {
      id: 2,
      userInput: "電車を逃しました。",
      aiOutput: "悠久の刻に乗り遅れました。",
      meaning: "（電車に乗り遅れた）",
    },
  ];

  return (
    <div>
      <h1>やんごとなき言い訳</h1>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} data={msg} />
      ))}
    </div>
  );
};

export default ChatHistory;
