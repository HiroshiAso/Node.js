// モジュールの読み込み
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// index.ejsファイルを同期的に読み込み、変数を定義
const index_page = fs.readFileSync('./index.ejs', 'utf-8');

// getFromClient関数を定義
const getFromClient = (request, response) => {
  // 読み込んだテンプレートをデータでレンダリング
  const content = ejs.render(index_page, {
    title: "EJS Sample",
    content: "This is EJS sample page.",
    message: "これは、EJSのサンプルページです。"
  });
  
  // レスポンスヘッダーの設定
  response.setHeader('Content-Type', 'text/html');
  // 読み込んだHTMLファイルをクライアントに送信
  response.write(content);
  // レスポンスの終了
  response.end();
};

// HTTPサーバーの作成とgetFromClient関数の設定
const server = http.createServer(getFromClient);

// サーバーの待機
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});