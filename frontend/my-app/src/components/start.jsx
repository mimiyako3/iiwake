import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import styles from '../styles/StartPage.module.css'; // 追加

function StartButton() {
  const navigate = useNavigate();
  const handleStart = () => navigate('/main');

  return (
    <button
      className={styles.startButton} // 追加
      onClick={handleStart}
    >
      始める
    </button>
  );
}

function HelpButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef();

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      if (rect.left < 0) {
        tooltip.style.left = `${-rect.left + 10}px`;
      }
    }
  }, [showTooltip]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {showTooltip && (
        <div
          ref={tooltipRef}
          className={styles.tooltip} // 追加
        >
          入力した状況に応じて、平安貴族AIが<br />
          あなたの代わりに雅な言い訳を作成してくれるアプリです。
        </div>
      )}
      <button
        className={styles.helpButton} // 追加
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ？
      </button>
    </div>
  );
}

function StartPage() {
  return (
    <div className={styles.startPageContainer}>
      <div
        style={{
          height: '90vh',
          width: '90vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: 'auto',
          overflow: 'hidden',
          boxSizing: 'border-box',
          position: 'relative',
          fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', serif",
        }}
      >
      {/* 右上ヘルプボタン */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
      }}>
        <HelpButton />
      </div>
      {/* 中央タイトル */}
      <h1 className={styles.title}>やんごとなき言い訳</h1>
      {/* 下部ボタン */}
      <StartButton />
      <Footer />
    </div>
    </div>
  );
}

export default StartPage;