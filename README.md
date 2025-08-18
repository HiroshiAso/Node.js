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
- サーバーの起動
    ```bash
    node app.js
    