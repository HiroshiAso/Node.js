# Node.js Hello World Docker環境構築手順

Dockerを使用してNode.jsのHello Worldアプリケーションを実行する手順です。

## 前提条件

- Docker Desktopがインストールされており、**起動していること**。

## セットアップと実行

1.  **Docker Desktopの起動**
    Docker Desktopが起動していることを確認してください。ターミナルで `docker version` を実行することで確認できます。

2.  **プロジェクトディレクトリへの移動**
    ターミナルを開き、`Node.js` ディレクトリに移動します：
    ```powershell
    cd c:\Users\hiros\Documents\Github\Node.js
    ```

3.  **コンテナのビルドと起動**
    以下のコマンドを実行してイメージをビルドし、コンテナを起動します：
    ```powershell
    docker-compose up -d --build
    ```
    - `-d`: コンテナをデタッチモード（バックグラウンド）で実行します。
    - `--build`: 最新の変更を反映させるためにイメージを強制的に再ビルドします。

4.  **アプリケーションの確認**
    ブラウザを開き、以下のアドレスにアクセスします：
    [http://localhost:3000](http://localhost:3000)

    **"Hello World"** というメッセージが表示されるはずです。

5.  **コンテナの停止**
    アプリケーションを停止するには、以下のコマンドを実行します：
    ```powershell
    docker-compose down
    ```

## トラブルシューティング

- **"The system cannot find the file specified"**: 通常、Docker Desktopが起動していないことを意味します。起動してください。
- **ポートが既に使用されている場合**: ポート3000が既に使用されている場合は、`docker-compose.yml` のポートマッピングを変更してください。

---

## 参考：アプリケーション作成手順

このサンプルアプリケーション（`sampleApp`）を一から作成する場合の手順です。

1.  **ディレクトリの作成と移動**
    ```powershell
    mkdir sampleApp
    cd sampleApp
    ```

2.  **package.json の初期化**
    デフォルト設定で `package.json` を作成します。
    ```powershell
    npm init -y
    ```

3.  **Express のインストール**
    Webフレームワークである Express をインストールします。
    ```powershell
    npm install express
    ```

4.  **index.js の作成**
    `index.js` ファイルを作成し、以下のコードを記述します。
    ```javascript
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    ```

5.  **package.json の修正**
    `package.json` の `scripts` セクションに起動コマンドを追加します。
    ```json
    "scripts": {
      "start": "node index.js"
    }
    ```
