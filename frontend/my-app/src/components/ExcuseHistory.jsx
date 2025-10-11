import React from "react";
import styles from "../styles/MainPage.module.css";

function ExcuseHistory({ history }) {
  return (
    <div className={styles.historyContainer}>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} className={styles.historyItem}>
            {/* ユーザー行（右寄せ） */}
            <div className={styles.userSide}>
              <div className={styles.userInput}>
                <strong>入力:</strong> {item.input}
              </div>
              <img
                src="/ユーザーアイコン(女).png" /* ← /public は付けない */
                alt="ユーザーアイコン"
                className={styles.icon}
              />
            </div>

            {/* AI行（左寄せ） */}
            <div className={styles.aiSide}>
              <img
                src="/男性.png" /* ← /public は付けない */
                alt="AIアイコン"
                className={styles.icon}
              />
              <div className={styles.message}>
                <strong>出力:</strong> {item.output}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExcuseHistory;
