// frontend/src/components/ExcuseDisplay.jsx
import React from 'react';
import styles from '../styles/MainPage.module.css';

function ExcuseDisplay({ excuse }) {
  return (
    <div className={styles.excuseContainer}>
      <h2>生成された言い訳</h2>
      <p>{excuse}</p>
    </div>
  );
}

export default ExcuseDisplay;
