import React, { useState } from "react";
import styles from "../styles/MainPage.module.css";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { FaTwitter, FaLine, FaEnvelope, FaDiscord, FaSlack } from "react-icons/fa";

function ExcuseDisplay({ excuse }) {
  // データがない場合は表示しない
  if (!excuse?.elegantText) {
      // 本文も意味もない場合は、挨拶文を表示するロジックを維持
      if (!excuse?.meaning) {
          return (
              <div className={styles.excuseContainer}>
                  <h2>いかにおはしますや(元気でいらっしゃいますか？)</h2>
              </div>
          );
      }
      // 本文がないが意味がある場合（このアプリでは通常あり得ないが）は本文エリアは空
      return null; 
  }
  const [showSharePopup, setShowSharePopup] = useState(false);

  // 🌐 固定アプリ情報
  const appName = "やんごとなき言い訳";
  const appUrl = "http://localhost:5173/";

  // 📝 改行付き共有テキスト（雅文＋意味＋アプリ名＋URL）
  const shareText = excuse
    ? `${excuse.elegantText || ""}\n\n（意味）${excuse.meaning || ""}\n\n【${appName}】${appUrl}`
    : "";

  // 📋 雅文のみコピー
  const handleCopy = () => {
    if (!excuse?.elegantText) return;
    navigator.clipboard
      .writeText(excuse.elegantText)
      .then(() => alert("雅文をコピーしました！"))
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
        alert("コピーに失敗しました。");
      });
  };

  // 🐦 Twitter共有（ハッシュタグ・改行対応）
  const handleShareTwitter = () => {
    if (!shareText) return;
    const tweetText = `${excuse.elegantText}\n\n（意味）${excuse.meaning}\n\n#${appName.replace(/\s+/g, "")}\n${appUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
    setShowSharePopup(false);
  };

  // 💚 LINE共有（改行対応）
  const handleShareLINE = () => {
    if (!shareText) return;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      `${appUrl}?text=${encodeURIComponent(shareText)}`
    )}`;
    window.open(lineUrl, "_blank");
    setShowSharePopup(false);
  };

  // ✉️ メール共有
  const handleShareMail = () => {
    if (!shareText) return;
    const subject = encodeURIComponent("【やんごとなき言い訳】共有");
    const body = encodeURIComponent(shareText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowSharePopup(false);
  };

  // 💬 Discord共有（テキストコピー後、Discordを開く）
  const handleShareDiscord = () => {
    if (!shareText) return;
    navigator.clipboard.writeText(shareText).then(() => {
      alert("共有テキストをコピーしました！Discordで貼り付けてください。");
      window.open("https://discord.com/channels/@me", "_blank");
    });
    setShowSharePopup(false);
  };

  // 🧑‍💻 Slack共有（コピー→Slack開く）
  const handleShareSlack = () => {
    if (!shareText) return;
    navigator.clipboard.writeText(shareText).then(() => {
      alert("共有テキストをコピーしました！Slackで貼り付けてください。");
      window.open("https://slack.com/app", "_blank");
    });
    setShowSharePopup(false);
  };

  // 📱 その他共有（クリップボードコピー）
  const handleWebShare = () => {
    if (!shareText) return;
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        alert("共有テキストをコピーしました！（その他アプリで貼り付けてください）");
        setShowSharePopup(false);
      })
      .catch((err) => {
        console.error("コピー失敗:", err);
        alert("コピーに失敗しました。");
      });
  };

  return (
    <div className={styles.excuseContainer}>

      {/* データあり */}

      {/* 雅文の表示 */}
      {excuse.elegantText && (
        <p className={styles.elegantText}>{excuse.elegantText}</p>
      )}

      {/* 意味 */}
      {excuse.meaning && (
        <>
          <h3>（意味）</h3>
          <p className={styles.meaningText}>{excuse.meaning}</p>
        </>
      )}

      {/* ボタン群 */}
      {excuse?.elegantText && (
        <div className={styles.buttonContainer}>
          <button
            onClick={handleCopy}
            className={styles.copyButton}
            title="雅文をコピー"
          >
            <FiCopy size={22} />
          </button>

          <button
            onClick={() => setShowSharePopup(true)}
            className={styles.shareButton}
            title="共有する"
          >
            <FiShare2 size={22} />
          </button>
        </div>
      )}

      {/* 💬 共有モーダル */}
      {showSharePopup && (
        <div
          className={styles.overlay}
          onClick={() => setShowSharePopup(false)}
        >
          <div
            className={styles.sharePopup}
            onClick={(e) => e.stopPropagation()}
          >
            <p>共有先を選択してください</p>
            <div className={styles.shareIcons}>
              <button
                onClick={handleShareTwitter}
                className={styles.twitterButton}
                title="Twitterで共有"
              >
                <FaTwitter size={28} />
              </button>
              <button
                onClick={handleShareLINE}
                className={styles.lineButton}
                title="LINEで共有"
              >
                <FaLine size={28} />
              </button>
              <button
                onClick={handleShareMail}
                className={styles.mailButton}
                title="メールで共有"
              >
                <FaEnvelope size={26} />
              </button>
              <button
                onClick={handleShareDiscord}
                className={styles.discordButton}
                title="Discordで共有"
              >
                <FaDiscord size={26} />
              </button>
              <button
                onClick={handleShareSlack}
                className={styles.slackButton}
                title="Slackで共有"
              >
                <FaSlack size={26} />
              </button>
              <button
                onClick={handleWebShare}
                className={styles.copyButtonPopup}
                title="その他で共有"
              >
                <FiShare2 size={26} />
              </button>
            </div>
            <button
              onClick={() => setShowSharePopup(false)}
              className={styles.closeButton}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcuseDisplay;
