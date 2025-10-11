import React, { useState, useCallback, useEffect } from 'react';
import InputForm from './InputForm';
import ExcuseDisplay from './ExcuseDisplay';
import styles from '../styles/MainPage.module.css';
import { Link } from 'react-router-dom';
import ModeButton from './ModeButton';
import Footer from './Footer.jsx';

function MainPage() {
  const [excuse, setExcuse] = useState({ elegantText: '', meaning: '' });
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // モードのデフォルト値を設定
  const [mode, setMode] = useState({
    gender: 'female', // デフォルトは女性
    length: 'short',  // デフォルトは短文
  });

  // 初回レンダリング時に localStorage から履歴を取得
  useEffect(() => {
    const storedHistory = localStorage.getItem('excuseHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

const generateExcuse = useCallback(async (input) => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch('http://localhost:3000/api/excuse', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, mode }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("バックエンドからのデータ:", data.excuse);

    setExcuse({ elegantText: data.excuse.elegantText, meaning: data.excuse.meaning });
    

    // 入力内容と生成された言い訳をオブジェクト形式で履歴に保存
    const newHistoryItem = { 
      input, 
      output: data.excuse.elegantText,
      meaning: data.excuse.meaning 
    };
    const newHistory = [newHistoryItem, ...history];
    setHistory(newHistory);
    localStorage.setItem('excuseHistory', JSON.stringify(newHistory));
  } catch (e) {
    setError(e.message);
    console.error("エラー:", e);
  } finally {
    setIsLoading(false);
  }
}, [history]);
  return (
    <div className={styles.mainPageContainer}>
      <Link to="/history" className={styles.historyLink}>履歴ページへ</Link>
      <h1>メインページ</h1>

      {error && <p className={styles.errorMessage}>エラー: {error}</p>}
      <ExcuseDisplay excuse={excuse} />
      <InputForm onSubmit={generateExcuse} />
      <ModeButton mode={mode} setMode={setMode} /> 
      <Footer />
    </div>
  );
}

export default MainPage;