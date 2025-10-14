// モジュールの読み込み
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

// index.ejsファイルを同期的に読み込み、変数を定義
const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./index.ejs', 'utf-8');

// getFromClient関数を定義
const getFromClient = (request, response) => {

  const url_parts = url.parse(request.url, true);

  let content;
  switch (url_parts.pathname) {
    case '/':
      // 読み込んだテンプレートをデータでレンダリング
      content = ejs.render(index_page, {
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

      break;

    case '/other':
      // 読み込んだテンプレートをデータでレンダリング
      content = ejs.render(other_page, {
        title: "Other",
        content: "これは新しく用意したページです。",
        message: "これは、他のページのメッセージです。"
      });
            // レスポンスヘッダーの設定
      response.setHeader('Content-Type', 'text/html');
      // 読み込んだHTMLファイルをクライアントに送信
      response.write(content);
      // レスポンスの終了
      response.end();
      break;
  }
};

// HTTPサーバーの作成とgetFromClient関数の設定
const server = http.createServer(getFromClient);

// サーバーの待機
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});