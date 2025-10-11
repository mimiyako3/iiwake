import React, { useState, useCallback, useEffect } from "react";
import InputForm from "./InputForm";
import ExcuseDisplay from "./ExcuseDisplay";
import styles from "../styles/MainPage.module.css";
import { Link } from "react-router-dom";

function MainPage() {
  const [excuse, setExcuse] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 初回レンダリング時に localStorage から履歴を取得
  useEffect(() => {
    const storedHistory = localStorage.getItem("excuseHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const generateExcuse = useCallback(
    async (input) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3000/api/excuse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExcuse(data.excuse);

        // 入力内容と生成された言い訳をオブジェクト形式で履歴に保存
        const newHistoryItem = { input, output: data.excuse };
        const newHistory = [newHistoryItem, ...history];
        setHistory(newHistory);
        localStorage.setItem("excuseHistory", JSON.stringify(newHistory));
      } catch (e) {
        setError(e.message);
        console.error("エラー:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [history]
  );
  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.mainPageCenter}>
        <Link to="/history" className={styles.historyLink}>
          履歴ページへ
        </Link>
        <h1>やんごとなき言い訳</h1>

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
