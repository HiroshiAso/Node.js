// ==== モジュール読み込み ==== //
const http = require('http'); // HTTP サーバーを作るための標準モジュール
const fs = require('fs');     // ファイルを読み書きするための標準モジュール
const path = require('path'); // ファイルパス操作をシンプルにする標準モジュール
const ejs = require('ejs');   // HTML テンプレートを扱うためのライブラリ

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
// ここで同期読み込み（readFileSync）を使うことで、起動直後にエラーがあればすぐに発見できます。
const template = fs.readFileSync(templatePath, 'utf-8');

const server = http.createServer((request, response) => {
  // 今回はトップページのみを対象としたシンプルなサンプルなので、"/" 以外は 404 を返す。
  if (request.url !== '/') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    response.end('ページが見つかりません。');
    return;
  }

  // アプリケーション変数を更新。すべてのユーザーからのアクセスで共有される。
  // ブラウザを更新するたびに visitCount が増えている様子を通じて、アプリケーション変数の仕組みを説明できます。
  appVariables.visitCount += 1;

  // EJS テンプレートにアプリケーション変数を渡して HTML を生成。
  // テンプレート内では「app」という名前でアクセスできます。
  const html = ejs.render(template, { app: appVariables });

  // 文字コードを UTF-8 に指定した HTML をレスポンスとして返す。
  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  response.end(html);
});

if (require.main === module) {
  // このファイルを直接「node app9.js」で実行したときだけサーバーを起動する。
  server.listen(PORT, () => {
    console.log(`App9 server running at http://localhost:${PORT}/`);
  });
}

// 他のファイルからもサーバーやアプリケーション変数を利用できるようにエクスポートしておく。
module.exports = { server, appVariables };
