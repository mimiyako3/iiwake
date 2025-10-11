import React from 'react';
import styles from '../styles/MainPage.module.css';

function ExcuseHistory({ history }) {
  return (
    <div className={styles.historyContainer}>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} className={styles.historyItem}>
            <p><strong>入力:</strong> {item.input}</p>
            <p><strong>出力:</strong> {item.output}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExcuseHistory;