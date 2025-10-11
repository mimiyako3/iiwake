// frontend/src/components/ExcuseHistory.jsx (修正)
import React from "react";
import styles from "../styles/MainPage.module.css";

// 💡 文字列であることを保証するユーティリティ関数を定義 (コンポーネントの外で定義するのが一般的)
const ensureString = (value) => {
    if (!value) return '';
    if (typeof value === 'object') {
        // オブジェクトの場合はJSON文字列に変換
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

  return (
    <div className={styles.historyContainer}>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => {
          console.log("履歴アイテム:", item.mode); 

          const aiGender = item.mode === 'female' ? '女性' : '男性';
          const aiIconPath =
            aiGender === '女性' ? '/女性.png' : '/男性.png';

          return (
            <li key={index} className={styles.historyItem}>
              
              <div className={styles.userSide}>
                <div className={styles.userInput}>
                  {ensureString(item.input)}
                </div>
                <img
                  src="/ユーザーアイコン(女).png" // 👈 固定アイコンのパスに修正
                  alt="ユーザーアイコン"
                  className={styles.icon}
                />
              </div>

              <div className={styles.aiSide}>
                <img src={aiIconPath} alt={`${aiGender}`} className={styles.icon} />
                <div className={styles.message}>
                  <p className={styles.elegantText}>{ensureString(item.output)}</p>
                  
                  {item.meaning && (
                      <p className={styles.meaning}>
                          <br />
                          <strong>【意味】</strong><br />
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