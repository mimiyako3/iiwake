// frontend/src/components/ExcuseDisplay.jsx
import React from "react";
import styles from "../styles/MainPage.module.css";
import { FiCopy } from "react-icons/fi"; // Feather Icons のコピーアイコン

function ExcuseDisplay({ excuse }) {
  // データがない場合は表示しない
  if (!excuse?.elegantText) {
      // 本文も意味もない場合は、挨拶文を表示するロジックを維持
      if (!excuse?.meaning) {
          return (
              <div className={styles.excuseContainer}>
                  <h2>いかにおはしますや(元気でいらっしゃいますか？)</h2>
              </div>
          );
      }
      // 本文がないが意味がある場合（このアプリでは通常あり得ないが）は本文エリアは空
      return null; 
  }

  // 💡 コピー処理をハンドルする関数
  const handleCopy = () => {
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

      {/* データあり */}

      {/* 雅文の表示 */}
      {excuse.elegantText && (
        <p className={styles.elegantText}>{excuse.elegantText}</p>
      )}

       {/* コピーボタン */}
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          title="雅文のみをクリップボードにコピー" // ツールチップも修正
        >
          <FiCopy size={22} /> 
        </button>


      {/* 意味の表示 */}
      {/* {excuse.meaning && (
        <>
          <h3>【意味】</h3>
          <p className={styles.meaningText}>{excuse.meaning}</p>
        </>
      )} */}

     
    </div>
  );
}

export default ExcuseDisplay;
