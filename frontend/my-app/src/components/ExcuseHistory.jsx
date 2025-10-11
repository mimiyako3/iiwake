import React from 'react';
import styles from '../styles/MainPage.module.css';

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
        {history.map((item, index) => (
          <li key={index} className={styles.historyItem}>
            {/* 1. input がオブジェクトなら JSON.stringify で文字列化 */}
            <p><strong>【状況】</strong> {typeof item.input === 'object' ? JSON.stringify(item.input) : item.input}</p>
            
            {/* 2. output がオブジェクトなら JSON.stringify で文字列化 */}
            <p className={styles.elegantText}> {typeof item.output === 'object' ? JSON.stringify(item.output) : item.output}</p>
            
            {/* 3. meaning も同様に確認 */}
            {item.meaning && (
                <p className={styles.meaning}>
                    <strong>意味:</strong> {typeof item.meaning === 'object' ? JSON.stringify(item.meaning) : item.meaning}
                </p>
            )}
            
            {/* 区切り線 */}
            <hr className={styles.divider} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExcuseHistory;