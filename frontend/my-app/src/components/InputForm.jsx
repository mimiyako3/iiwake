// frontend/src/components/InputForm.jsx
import React, { useState } from "react";
import styles from "../styles/MainPage.module.css";

function InputForm({ onSubmit , isLoading}) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <textarea
        className={styles.inputArea}
        value={input}
        onChange={handleInputChange}
        placeholder="今の状況を入力してください"
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // ShiftなしEnterで送信
            e.preventDefault(); // 改行を防ぐ
            handleSubmit(e); // 送信処理呼び出し
          }
        }}
      />
      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        生成
      </button>
    </form>
  );
}

export default InputForm;
