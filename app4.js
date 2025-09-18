// モジュールの読み込み
const http = require('http');
const fs = require('fs');


// HTTPサーバーの作成
const server = http.createServer((request, response) => {
    // 非同期でindex.htmlファイルを読み込み
    fs.readFile('./index.html', 'utf-8', (err, data) => {
        // レスポンスヘッダーの設定
        response.setHeader('Content-Type', 'text/html');
        // 読み込んだHTMLファイルをクライアントに送信
        response.write(data);
        // レスポンスの終了
        response.end();
    });
});

// サーバーの待機
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

