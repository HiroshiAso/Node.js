# Node.js
## 1コマ目の内容 - Node.jsの基本
- Node.jsとは何か
- Node.jsのインストール方法
- Node.jsの実行環境の構築
### 手順
- app.jsファイル作成
    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    });

    server.listen(3000, () => {
        console.log('Server running at http://localhost:3000/');
    });
    ```
    ```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>おしゃれなハローワールド</title>
            <style>
                body {
                    background: linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%);
                    height: 100vh;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Segoe UI', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
                }
                .container {
                    background: rgba(255,255,255,0.85);
                    padding: 48px 64px;
                    border-radius: 24px;
                    box-shadow: 0 8px 32px rgba(60,60,60,0.15);
                    text-align: center;
                }
                h1 {
                    font-size: 3rem;
                    color: #43c6ac;
                    margin-bottom: 0.5em;
                    letter-spacing: 0.1em;
                }
                p {
                    color: #555;
                    font-size: 1.2rem;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>ハロー・ワールド！</h1>
                <p>Node.jsで作ったおしゃれな画面つくってちょ！</p>
            </div>
        </body>
        </html>
    `);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
    ```
- サーバーの起動
    ```bash
    node app.js
    ```

## 8コマ目の内容 - EJSパーシャルでヘッダー共通化
- `app8.js` を起動すると、共通ヘッダーを使った5つの画面（Home/About/Services/Contact/FAQ）を確認できます。
- ヘッダーは `views/partials/header.ejs` に切り出しており、ここを修正すれば全ページへ反映されます。
- 各ページは `views/*.ejs` に配置され、`<%- include('partials/header', ...) %>` でパーシャルを読み込んでいます。
- ヘッダーのデザインは `css/header.css` にまとめており、CSSはサーバーから `/css/header.css` として配信されます。

### サーバーの起動
```bash
node app8.js
```

### 動作確認のポイント
- どのページでも同じナビゲーションが表示され、現在のページは太字で示されます。
- Contactページでフォームを送信すると、同じテンプレート内で送信内容が表示されます。
    