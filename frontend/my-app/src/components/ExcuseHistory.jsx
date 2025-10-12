// frontend/src/components/ExcuseHistory.jsx (修正版)

import React from "react";
import styles from "../styles/MainPage.module.css";
import { FiCopy } from "react-icons/fi";

// 💡 文字列であることを保証するユーティリティ関数
const ensureString = (value) => {
  if (!value) return "";
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return value;
};

function ExcuseHistory({ history }) {
  const handleCopy = (text) => {
    const s = ensureString(text);
    if (!s) return;
    navigator.clipboard
      .writeText(s)
      .then(() => {
        alert("雅文（言い訳本文）をコピーしました！");
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
        alert("コピーに失敗しました。ブラウザの設定を確認してください。");
      });
  };

  // historyが空の場合はメッセージを表示
  if (!history || history.length === 0) {
    return (
      <div className={styles.historyContainer}>
        <h2>履歴</h2>
        <p>履歴はありません。</p>
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => {
          console.log("履歴アイテム:", item);

          const elegant =
            typeof item.output === "string"
              ? item.output
              : item.output?.elegantText ?? "";

          const aiGender = item.mode === "female" ? "女性" : "男性";
          const aiIconPath = aiGender === "女性" ? "/女性.png" : "/男性.png";
          const userGender = item.mode === "female" ? "女性" : "男性";
          const userIconPath =
            userGender === "女性"
              ? "/ユーザーアイコン(女).png"
              : "/ユーザーアイコン(男).png";
          console.log("AIの性別:", aiGender);
          console.log("ユーザーの性別:", userGender);

          return (
            <li key={index} className={styles.historyItem}>
              {/*ユーザー*/}
              <div className={styles.userSide}>
                <div className={styles.userInput}>
                  {ensureString(item.input)}
                </div>
                <img
                  src={userIconPath}
                  alt={`${userGender}`}
                  className={styles.icon}
                />
              </div>

              {/* AI */}
              <div className={styles.aiSide}>
                <img
                  src={aiIconPath}
                  alt={`${aiGender}`}
                  className={styles.icon}
                />
                <div className={styles.message}>
                  <div className={styles.elegantRow}>
                    <p className={styles.elegantText}>
                      {ensureString(elegant)}
                    </p>

                    {elegant && (
                      <button
                        type="button"
                        onClick={() => handleCopy(elegant)}
                        className={styles.copyButton}
                        title="雅文のみをコピー"
                        aria-label="雅文のみをコピー"
                      >
                        <FiCopy size={18} />
                      </button>
                    )}
                  </div>
                  {item.meaning && (
                    <p className={styles.meaning}>
                      <br />
                      <strong>【意味】</strong>
                      <br />
                      {ensureString(item.meaning)}
                    </p>
                  )}
                </div>
              </div>

              <hr className={styles.divider} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ExcuseHistory;
