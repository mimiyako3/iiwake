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
          
          // 🚨 修正: 履歴アイテムの mode が存在し、genderプロパティを持つか確認
          //    古い履歴データ対策として防御的なチェックを導入
          const currentGender = (
            item.mode && 
            typeof item.mode === 'object' && 
            item.mode.gender
          )
            ? item.mode.gender // 存在すればその値を使用
            : 'female';        // 存在しない場合は 'female' をデフォルトとする
          
          const aiGender = currentGender === 'female' ? '女性' : '男性';
          const aiIconPath =
            aiGender === '女性' ? '/女性.png' : '/男性.png';

          // 🚨 修正: 処理結果を一つの return で返す
          return (
            <li key={index} className={styles.historyItem}>
              
              {/* 1. ユーザー行（右寄せ）: 入力/お題 */}
              <div className={styles.userSide}>
                <div className={styles.userInput}>
                  <strong>お題:</strong> {ensureString(item.input)}
                </div>
                <img
                  src="/ユーザーアイコン(女).png" // ユーザーアイコンは固定
                  alt="ユーザーアイコン"
                  className={styles.icon}
                />
              </div>

              {/* 2. AI行（左寄せ）: 雅文 (output) */}
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
          ); // 👈 mapのコールバック関数はここで終了
        })}
      </ul>
    </div>
  );
}

export default ExcuseHistory;