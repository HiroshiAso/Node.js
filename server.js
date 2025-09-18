const http = require('http');

const server = http.createServer((request, response) => {
    // レスポンスヘッダーを設定
    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 複数のresponse.write()を使ってHTMLを段階的に送信
    response.write('<!DOCTYPE html><html lang="ja">');
    response.write('<head>');
    response.write('<meta charset="UTF-8">');
    response.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    response.write('<title>株式会社サンプル - トップページ</title>');
    response.write('<style>');
    response.write('body { font-family: sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }');
    response.write('header { background-color: #004d99; color: white; text-align: center; padding: 2em 0; }');
    response.write('header h1 { margin: 0; font-size: 2.5em; }');
    response.write('.container { max-width: 800px; margin: 2em auto; padding: 0 1em; }');
    response.write('.section { margin-bottom: 2em; padding-bottom: 2em; border-bottom: 1px solid #eee; }');
    response.write('.section:last-child { border-bottom: none; }');
    response.write('footer { background-color: #f4f4f4; text-align: center; padding: 1em 0; color: #777; font-size: 0.9em; }');
    response.write('</style>');
    response.write('</head>');
    response.write('<body>');
    response.write('<header>');
    response.write('<h1>株式会社サンプル</h1>');
    response.write('<p>未来を創造するテクノロジー</p>');
    response.write('</header>');
    response.write('<main class="container">');
    response.write('<div class="section">');
    response.write('<h2>事業内容</h2>');
    response.write('<p>私たちは、革新的なソフトウェア開発を通じて、お客様のビジネス成長を支援します。AI、クラウドコンピューティング、モバイルアプリケーションなど、最先端の技術でお客様の課題を解決します。</p>');
    response.write('</div>');
    response.write('<div class="section">');
    response.write('<h2>会社概要</h2>');
    response.write('<p>設立：2023年</p>');
    response.write('<p>所在地：東京都港区六本木</p>');
    response.write('<p>連絡先：info@sample-corp.com</p>');
    response.write('</div>');
    response.write('</main>');
    response.write('<footer>');
    response.write('<p>&copy; 2023 Sample Corporation. All Rights Reserved.</p>');
    response.write('</footer>');
    response.write('</body>');
    response.write('</html>');

    // レスポンスの送信を完了
    response.end();
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});