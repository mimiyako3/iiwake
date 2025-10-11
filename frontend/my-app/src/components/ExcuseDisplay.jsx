// frontend/src/components/ExcuseDisplay.jsx
import React from "react";
import styles from "../styles/MainPage.module.css";

function ExcuseDisplay({ excuse }) {
  // データがない場合は表示しない
  if (!excuse || (!excuse.elegantText && !excuse.meaning)) {
    return null;
  }

  // 💡 コピー処理をハンドルする関数
  const handleCopy = () => {
    // 🚨 雅文 (elegantText) のみを取得
    const textToCopy = excuse.elegantText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("雅文（言い訳本文）をコピーしました！"); // メッセージも修正
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
        alert("コピーに失敗しました。ブラウザの設定を確認してください。");
      });
  };

  return (
    <div className={styles.excuseContainer}>
      <h2>雅文</h2>
      {/* 雅文の表示 */}
      {excuse.elegantText && (
        <p className={styles.elegantText}>{excuse.elegantText}</p>
      )}

      {/* 意味の表示 */}
      {excuse.meaning && (
        <>
          <h3>（意味）</h3>
          <p className={styles.meaningText}>{excuse.meaning}</p>
        </>
      )}

      {/* 💡 コピーボタンの修正 */}
      <button
        onClick={handleCopy}
        className={styles.copyButton}
        title="雅文のみをクリップボードにコピー" // ツールチップも修正
      >
        📋 雅文のみコピー
      </button>
    </div>
  );
}

export default ExcuseDisplay;
