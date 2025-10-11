import React, { useState, useEffect } from 'react';
import ExcuseHistory from './ExcuseHistory';
import styles from '../styles/MainPage.module.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);

  // 初回レンダリング時に localStorage から履歴を取得
  useEffect(() => {
    const storedHistory = localStorage.getItem('excuseHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div className={styles.historyPageContainer}>
      <h1>履歴ページ</h1>
      <p>ここに履歴が表示されます。</p>
      <ExcuseHistory history={history} />
    </div>
  );
}

export default HistoryPage;