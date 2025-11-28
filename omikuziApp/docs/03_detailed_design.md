# 詳細設計書

## 1. サーバーサイド処理設計

### 1.1 ルーティング定義 (`routes/index.js`)

| メソッド | パス | 処理概要 | レスポンス |
| :--- | :--- | :--- | :--- |
| GET | `/` | おみくじを実行し、結果画面を表示する。 | HTML (index.ejs) |

### 1.2 処理ロジック詳細
`GET /` アクセス時の処理フローは以下の通り。

1.  **運勢リストの定義**:
    -   定数配列として以下を定義する。
    -   `const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];`
2.  **抽選処理**:
    -   `Math.random()` を使用して 0 以上 1 未満の乱数を生成する。
    -   `Math.floor(Math.random() * fortunes.length)` により、配列のインデックス（0 ～ 4）を決定する。
3.  **レスポンス生成**:
    -   `res.render('index', { ... })` を呼び出す。
    -   テンプレート変数として以下を渡す。
        -   `title`: 文字列 `'おみくじアプリ'`
        -   `fortune`: 抽選された運勢文字列（例: `'大吉'`）

## 2. フロントエンド設計

### 2.1 画面レイアウト (`views/index.ejs`)
HTML5を使用し、以下の構造とする。

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <div class="container">
      <h1><%= title %></h1>
      <p>今日の運勢は...</p>
      <div class="fortune"><%= fortune %></div>
      <p>です！</p>
      <a href="/" class="btn">もう一度引く</a>
    </div>
  </body>
</html>
```

### 2.2 スタイル定義 (`public/stylesheets/style.css`)
視認性を高め、日本のおみくじらしい配色（白・赤・黒）を採用する。

-   **body**:
    -   背景色: `#f0f0f0` (薄いグレー)
    -   フォント: メイリオ, sans-serif
    -   配置: Flexbox等を用いて画面中央にコンテンツを配置する。
-   **.container**:
    -   背景色: `#ffffff` (白)
    -   幅: 最大 500px
    -   余白: `padding: 40px`
    -   装飾: 角丸 (`border-radius: 10px`)、影 (`box-shadow`)
-   **h1**:
    -   色: `#d32f2f` (濃い赤)
-   **.fortune**:
    -   フォントサイズ: `3em` (強調)
    -   色: `#d32f2f` (濃い赤)
    -   太字: `bold`
    -   余白: 上下 `20px`
-   **.btn**:
    -   形状: ボタン風リンク
    -   背景色: `#d32f2f`
    -   文字色: `#ffffff`
    -   余白: `padding: 10px 20px`
    -   装飾: 角丸、ホバー時に色を薄くする等のインタラクション。

## 3. エラー処理設計
-   **404 Not Found**:
    -   存在しないパスへのアクセス時は、Express標準の404ハンドラにより `error.ejs` を表示する。
-   **500 Internal Server Error**:
    -   サーバー内部エラー発生時は、スタックトレース（開発環境のみ）を含むエラーページを表示する。
