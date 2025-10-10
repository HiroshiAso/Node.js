const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const PORT = process.env.PORT || 3000;
const templatePath = path.join(__dirname, 'views', 'app9.ejs');

// アプリケーション全体で共有する変数をまとめたオブジェクト
// どのリクエストからでも同じ値にアクセスできる状態を "アプリケーション変数" と呼ぶ想定です。
const appVariables = {
  siteTitle: 'アプリケーション変数のサンプル',
  sharedMessage: 'このメッセージはアプリ全体で共有されています。',
  visitCount: 0
};

// テンプレートは起動時に一度だけ読み込み、毎回レンダリングに利用します。
const template = fs.readFileSync(templatePath, 'utf-8');

const server = http.createServer((request, response) => {
  if (request.url !== '/') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    response.end('ページが見つかりません。');
    return;
  }

  // アプリケーション変数を更新。すべてのユーザーからのアクセスで共有される。
  appVariables.visitCount += 1;

  const html = ejs.render(template, { app: appVariables });

  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  response.end(html);
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`App9 server running at http://localhost:${PORT}/`);
  });
}

module.exports = { server, appVariables };
