//expresnpのモジュールを読み込む
const express = require("express");
// CORS ミドルウェアを読み込む
const cors = require("cors");

//expressをインスタンス化
const app =express();
//PORT番号を設定
const PORT = 3000;
// CORS を有効化
app.use(cors()); 

console.log("Hello World");

app.get("/api",(req,res)=>{
    res.json("ハッカソン 2025");
});

//サーバーを起動する
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});