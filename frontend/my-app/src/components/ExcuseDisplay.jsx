// frontend/src/components/ExcuseDisplay.jsx
import React from 'react';
import styles from '../styles/MainPage.module.css';

function ExcuseDisplay({ excuse }) {
    console.log("Excuse オブジェクト:", excuse);
  return (
    <div className={styles.excuseContainer}>
      <h2>雅文</h2>
      <p>{excuse.elegantText}</p>
      <p>{excuse.meaning}</p>
    </div>
  );
}

export default ExcuseDisplay;
