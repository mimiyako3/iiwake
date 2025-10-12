import React, { useState, useEffect } from 'react';
import ExcuseHistory from './ExcuseHistory';
import styles from '../styles/MainPage.module.css';
import { Link } from 'react-router-dom';
import Footer from './Footer.jsx';


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
      <ExcuseHistory history={history} />
      <br />
      <Link to="/main" className={styles.historyLink}>メインページへ</Link>
      <Link to="/">スタートページへ</Link>
      <Footer />
    </div>
  );
}

export default HistoryPage;