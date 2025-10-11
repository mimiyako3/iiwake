import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function StartButton() {
  const navigate = useNavigate();
  const handleStart = () => navigate('/main');

  return (
    <button
      onClick={handleStart}
      style={{
        padding: '0.8em 2em',
        fontSize: '2.5em',
        borderRadius: '20px', // 角に丸みをつける
        border: '2px solid #000000ff',
        backgroundColor: '#e7e7e7ff',
        color: 'black',
        cursor: 'pointer',
        marginBottom: '5vh',
        fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', serif", // 和風フォント
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
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

  // 画面内に収めるための調整
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
      {/* 吹き出し */}
      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: '50%',
            right: 'calc(100% + 10px)', // ボタンの左側にずらす + 10px隙間
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '0.6em 1em',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10,
            whiteSpace: 'nowrap',
            overflowX: 'auto',
            textAlign: 'left',
            maxWidth: 'calc(100vw - 120px)',
            fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', serif", // 和風フォント
          }}
        >
          入力した状況に応じて、平安貴族AIが<br />
          あなたの代わりに雅な言い訳を作成してくれるアプリです。
        </div>
      )}

      {/* 円形ボタン */}
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '3em',
          height: '3em',
          borderRadius: '50%',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '1.2em',
          position: 'relative',
          zIndex: 11,
        }}
      >
        ？
      </button>
    </div>
  );
}

function StartPage() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center', // 水平方向中央
        alignItems: 'center',     // 垂直方向中央
    
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', serif",
      }}
    >
    <div
      style={{
        height: '90vh',
        width: '90vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // 上下中央にまとめる
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
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        <HelpButton />
      </div>

      {/* 中央タイトル */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', serif",
          marginBottom: '10vh', // タイトルとボタンの間隔
        }}
      >
        <h1 style={{ 
            fontSize: '7em',
            margin: 0,}}
        >やんごとなき言い訳</h1>
      </div>

      {/* 下部ボタン */}
      <StartButton />
    </div>
    </div>
  );
}

export default StartPage;
