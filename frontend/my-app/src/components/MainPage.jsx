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
    const storedHistory = localStorage.getItem("excuseHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        } else {
          localStorage.removeItem("excuseHistory");
        }
      } catch (e) {
        console.error("履歴データのパースに失敗しました:", e);
        localStorage.removeItem("excuseHistory");
      }
    }

    // モードの読み込み
    const storedMode = localStorage.getItem("appMode");
    if (storedMode) {
        try {
            const parsedMode = JSON.parse(storedMode);
            // Local Storageの値でデフォルト値を上書き
            setMode(prevMode => ({
                ...prevMode,
                ...parsedMode
            }));
        } catch (e) {
             console.error("モードデータのパースに失敗しました:", e);
        }
    }
  }, []);




  const generateExcuse = useCallback(
    async (input) => {
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
   setHistory(prevHistory => {
    console.log("モード:", mode);
          const safePrevHistory = Array.isArray(prevHistory) ? prevHistory : [];
          const newHistoryItem = { 
            input, 
            output: data.excuse.elegantText,
            meaning: data.excuse.meaning,
            mode: mode.gender
          };
    const newHistory = [newHistoryItem, ...safePrevHistory];
          localStorage.setItem('excuseHistory', JSON.stringify(newHistory));
          return newHistory;
        });
  } catch (e) {
    setError(e.message);
    console.error("エラー:", e);
  } finally {
    setIsLoading(false);
  }
}, [history]);

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.mainPageCenter}>
        <Link to="/history" className={styles.historyLink}>
          履歴ページへ
        </Link>
        <h1>やんごとなき言い訳</h1>

      {error && <p className={styles.errorMessage}>エラー: {error}</p>}
      <ExcuseDisplay excuse={excuse} />
      <InputForm onSubmit={generateExcuse} />
      <ModeButton mode={mode} setMode={setMode} /> 
      <Footer />
        {error && <p className={styles.errorMessage}>エラー: {error}</p>}
        <div className={styles.inputOutputContainer}>
          <img src="/男性.png" alt="AIアイコン" className={styles.icon} />
          <div className={styles.excuseDisplayContainer}>
            <ExcuseDisplay excuse={excuse} />
          </div>
        </div>
        <div className={styles.inputSection}>
          <div className={styles.inputFormContainer}>
            <InputForm onSubmit={generateExcuse} />
          </div>
          <img
            src="/ユーザーアイコン(女).png"
            alt="ユーザーアイコン"
            className={styles.icon}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
