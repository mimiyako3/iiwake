// frontend/src/components/ExcuseHistory.jsx (修正版)

import React from "react";
import styles from "../styles/MainPage.module.css";
import { FiCopy, FiShare2 } from "react-icons/fi";

// 💡 文字列であることを保証するユーティリティ関数
const ensureString = (value) => {
  if (!value) return "";
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return value;
};

function ExcuseHistory({ history }) {
  // historyが空の場合はメッセージを表示
  if (!history || history.length === 0) {
    return (
      <div className={styles.historyContainer}>
        <h2>履歴</h2>
        <p>履歴はありません。</p>
      </div>
    );
  }

  // 💡 コピー処理をハンドルする関数をここに定義
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("雅文（言い訳本文）をコピーしました！");
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
        alert("コピーに失敗しました。ブラウザの設定を確認してください。");
      });
  };

  return (
    <div className={styles.historyContainer}>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => {
          console.log("履歴アイテム:", item);

          const outputText = ensureString(item.output);
          const shouldShowCopyButton = outputText.length > 0;

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
                  <div className={styles.elegantText}>
                    {ensureString(item.output)}{" "}
                  </div>

                  {shouldShowCopyButton && (
                    <div className={styles.historyCopyButton}>
                      <button
                        onClick={() => handleCopy(item.output)}
                        className={styles.copyButton}
                        title="この雅文をコピー"
                      >
                        <FiCopy size={18} />
                      </button>
                    </div>
                  )}

                  {item.meaning && (
                    <div className={styles.meaningText}>
                      <strong>【意味】</strong>
                      {ensureString(item.meaning)}
                    </div>
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
