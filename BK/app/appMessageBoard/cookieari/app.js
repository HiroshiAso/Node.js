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
// データ
var data = { msg: 'no message...' };

// indexのアクセス処理
function response_index(request, response) {
  // POSTアクセス時の処理
  if (request.method == 'POST') {
    var body = '';

    // データ受信のイベント処理
    request.on('data', (data) => {
      body += data;
    });

    // データ受信終了のイベント処理
    request.on('end', () => {
      data = qs.parse(body);
      // クッキーの保存
      setCookie('msg', data.msg, response);
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
}

// indexのページ作成
function write_index(request, response) {
  var msg = "※伝言を表示します。"
  var cookie_data = getCookie('msg', request);
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
    cookie_data: cookie_data,
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
}

// クッキーの値を設定
function setCookie(key, value, response) {
  var cookie = escape(value);
  response.setHeader('Set-Cookie', [key + '=' + cookie]);
}
// クッキーの値を取得
function getCookie(key, request) {
  var cookie_data = request.headers.cookie != undefined ?
    request.headers.cookie : '';
  var data = cookie_data.split(';');
  for (var i in data) {
    if (data[i].trim().startsWith(key + '=')) {
      var result = data[i].trim().substring(key.length + 1);
      return unescape(result);
    }
  }
  return '';
}