import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderTop: '1px solid #ccc',
        padding: '0.5em 1em',
        textAlign: 'center',
        fontSize: '0.9em',
        fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', serif",
        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
        zIndex: 100,
      }}
    >
      © 2025 Progate Women's ハッカソン in京都 | 舞妓チーム | 使用技術: React, Node.js
    </footer>
  );
}

export default Footer;