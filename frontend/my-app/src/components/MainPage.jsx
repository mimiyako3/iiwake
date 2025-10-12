import ModeButton from "./ModeButton";
import Footer from "./Footer.jsx";
import React, { useState, useCallback, useEffect } from "react";
import InputForm from "./InputForm";
import ExcuseDisplay from "./ExcuseDisplay";
import styles from "../styles/MainPage.module.css";
import { Link } from "react-router-dom";

function MainPage() {
  const [excuse, setExcuse] = useState({ elegantText: "", meaning: "" });
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // モードのデフォルト値を設定
  const [mode, setMode] = useState({
    gender: "female", 
    length: "short"
  });

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
        console.log("送信するモード:", mode);
        const response = await fetch("http://localhost:3000/api/excuse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input, mode }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("バックエンドからのデータ:", data.excuse);

        // setExcuse({
        //   elegantText: data.excuse.elegantText,
        //   meaning: data.excuse.meaning,
        // });

        setExcuse(data.excuse);

        setHistory((prevHistory) => {
        const safePrevHistory = Array.isArray(prevHistory) ? prevHistory : [];

        const newHistoryItem = {
          input,
          output: data.excuse.elegantText,
          meaning: data.excuse.meaning,
          mode: mode.gender,
        };
        console.log("新しい履歴アイテム:", newHistoryItem);

        const newHistory = [newHistoryItem, ...history];
        // setHistory(newHistory);
        localStorage.setItem("excuseHistory", JSON.stringify(newHistory));
        return newHistory
      });
      } catch (e) {
        setError(e.message);
        console.error("エラー:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [mode]
  );

  //意味のみを表示する
 const MeaningDisplay = ({ meaning }) => {
  if (!meaning) return null;
  return (
    <div className={styles.meaningContainer}>
      <p className={styles.meaningText}>
        <strong>意味:</strong> {meaning}
      </p>
    </div>
  );
  };

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.mainPageCenter}>
        <Link to="/history" className={styles.historyLink}>
          履歴
        </Link>
        <h1>やんごとなき言い訳</h1>

        {error && <p className={styles.errorMessage}>エラー: {error}</p>}
        <div className={styles.inputOutputContainer}>
          {/* <div className={styles.aiOutputSectionr}> */}
          <img
            src={mode.gender === "female" ? "/女性.png" : "/男性.png"}
            alt="AIアイコン" className={styles.icon}
          />
          {/* 出力表示 */}
          {/* <div className={styles.excuseDisplayContainer}> */}
          <div className={styles.excuseBubbleContainer}>
            {isLoading ? (
              <p className={styles.loadingMessage}>雅な言い訳を生成中です。少々お待ちください...</p>
            ) : (
                    <>
                <ExcuseDisplay
                  excuse={{ elegantText: excuse.elegantText }}
                />
                {excuse.meaning && (
                <MeaningDisplay meaning={excuse.meaning} />
                )}
              </>
            )}
          </div>
        </div>

        {error && <p className={styles.errorMessage}>エラー: {error}</p>}
        
        {/* モード選択 */}
        <ModeButton mode={mode} setMode={setMode} />
        <Footer />

        {/* 入力フォームとユーザーアイコンの配置 */}
        <div className={styles.inputSection}>
          <div className={styles.inputFormContainer}>
            <InputForm onSubmit={generateExcuse} isLoading={isLoading} />
          </div>
          <img
            src={mode.gender === "female" ? "/ユーザーアイコン(女).png" : "/ユーザーアイコン(男).png"}
            alt="ユーザーアイコン"
            className={styles.icon}
          />
        </div>
         <Link className={styles.link} to="/">はじめに戻る</Link>
      </div>
    </div>
  );
}

export default MainPage;