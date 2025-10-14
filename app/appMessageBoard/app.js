// --- モジュールの読み込み -------------------------------------------------
// http: Web サーバーを立ち上げるためのコアモジュール
// fs: ファイルを読み書きするためのモジュール
// ejs: EJS テンプレートエンジン (HTML を生成)
// url: アクセスされた URL を解析するためのモジュール
// querystring: POST データをオブジェクトに変換するヘルパー
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

// --- テンプレートやスタイルシートの読み込み ------------------------------
// サーバー起動時に一度だけファイルを読み込んでキャッシュしておくことで、
// リクエストごとにディスクアクセスを行う必要がなくなります。
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

// --- HTTP サーバーの作成と起動 --------------------------------------------
// getFromClient 関数がリクエストを受け取るたびに呼び出されます。
var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');
function getFromClient(request, response) {
  // URL を解析して「どのパスにアクセスされたか」を確認します。
  var url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {

    case '/':
      // トップページが要求された場合は response_index を使って処理します。
      response_index(request, response);
      break;

    case '/style.css':
      // CSS ファイルの内容をそのまま返します。
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(style_css);
      response.end();
      break;

    default:
      // 上記以外のパスの場合は簡単なメッセージを返します。
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('no page...');
      break;
  }
}

// 画面に表示するメッセージを保持する変数。
// 新しいメッセージが送られてくると、このオブジェクトが更新されます。
var data = { msg: 'no message...' };

function response_index(request, response) {
  // フォームから送られた場合 (POST) は、本文を読み取ってから表示処理へ。
  if (request.method == 'POST') {
    var body = '';
    request.on('data', (data) => {
      // データは複数回に分割されて届くことがあるので連結します。
      body += data;
    });

    request.on('end', () => {
      // 受け取った URL エンコード文字列をオブジェクトに変換します。
      data = qs.parse(body);
      write_index(request, response);
    });
  } else {
    // GET アクセスなど、データが送られていない場合はそのまま表示します。
    write_index(request, response);
  }
}

function write_index(request, response) {
  // 画面に表示するメッセージ。テンプレートへ渡す文字列です。
  var msg = "※伝言を表示します。"
  // EJS テンプレートへ渡すデータをまとめ、HTML を生成します。
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
  });
  // HTML をクライアントへ送り返します。
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
}