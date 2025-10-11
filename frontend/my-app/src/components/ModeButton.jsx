import React from 'react';
import styles from '../styles/Mainpage.module.css';

function ModeButton({ mode, setMode }) {
  const handleGenderChange = (e) => {
    setMode((prevMode) => ({
      ...prevMode,
      gender: e.target.value, // 性別モードを更新
    }));
  };

  const handleLengthChange = (e) => {
    setMode((prevMode) => ({
      ...prevMode,
      length: e.target.value, // 文章の長さモードを更新
    }));
  };

  return (
    <div>
      <div className={styles.modeOptions}>
        <div>
          性別:
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={mode.gender === 'male'}
              onChange={handleGenderChange}
            />
            男性
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={mode.gender === 'female'}
              onChange={handleGenderChange}
            />
            女性
          </label>
        </div>
        <div>
          文章の長さ:
          <label>
            <input
              type="radio"
              name="length"
              value="short"
              checked={mode.length === 'short'}
              onChange={handleLengthChange}
            />
            短文
          </label>
          <label>
            <input
              type="radio"
              name="length"
              value="long"
              checked={mode.length === 'long'}
              onChange={handleLengthChange}
            />
            長文
          </label>
        </div>
      </div>
    </div>
  );
}

export default ModeButton;