// frontend/src/components/ExcuseHistory.jsx (修正版)

import React from "react";
import styles from "../styles/MainPage.module.css";

// 💡 文字列であることを保証するユーティリティ関数
const ensureString = (value) => {
    if (!value) return '';
    if (typeof value === 'object') {
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
          console.log("履歴アイテム:", item);
      
          // const currentGender = (
          //   item.mode && 
          //   typeof item.mode === 'object' && 
          //   item.mode.gender
          // )
          //   ? item.mode // 存在すればその値を使用
          //   : 'female';

          const aiGender = item.mode === 'female' ? '女性' : '男性';
          const aiIconPath = aiGender === '女性' ? '/女性.png' : '/男性.png';
          const userGender = item.mode === 'female' ? '女性' : '男性'; 
          const userIconPath = userGender === '女性' ? '/ユーザーアイコン(女).png' : '/ユーザーアイコン(男).png';
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