# Node.js TODOアプリ講義資料

このドキュメントは、Node.js + Express + EJS + MySQLを使用したシンプルなTODOアプリの教育用構成案とスライド資料のドラフトです。

## 1. 講義構成案 (Teaching Plan)

### 目的
Webアプリケーションの基本的な仕組み（MVCモデル、データベース連携、ルーティング）を理解する。

### 構成フロー

1.  **導入 (Introduction)**
    *   作成するアプリのデモ（TODOの追加・削除）
    *   全体アーキテクチャの解説 (クライアント -> サーバー -> データベース)

2.  **アプリケーションの入口 (`app.js`)**
    *   Expressフレームワークのセットアップ
    *   ミドルウェアの設定 (URLエンコード、静的ファイル)
    *   Viewエンジンの設定 (EJS)
    *   ルーティングのマウント

3.  **画面の作成 (`views/index.ejs`)**
    *   HTMLフォームの作成 (`POST`メソッド)
    *   EJSテンプレート構文 (`<% %>`, `<%= %>`) を使った動的表示
    *   条件分岐とループ処理 (TODOリストの描画)

4.  **ロジックとデータベース制御 (`routes/index.js`)**
    *   ルーティングの基本 (`GET`, `POST`)
    *   データベース接続 (`pool`オブジェクト)
    *   非同期処理 (`async/await`) の重要性
    *   CRUD操作 (SELECT, INSERT, DELETE)

5.  **データの流れ (Data Flow)**
    *   リクエスト受信からレスポンス返却までのフロー確認
    *   `req.body` (フォームデータ) と `req.params` (URLパラメータ) の違い

---

## 2. スライド資料ドラフト (Slide Draft)

以下は、講義で使用するスライドの構成案です。

---

### スライド1: タイトル
# Node.jsで作るTODOアプリ
## Express, EJS, MySQLを使ったWeb開発入門

---

### スライド2: 作るもの (Goal)
*   **TODOリストアプリ**
    *   タスクの一覧表示
    *   新しいタスクの追加
    *   完了したタスクの削除
*   **技術スタック**
    *   Node.js (ランタイム)
    *   Express (Webフレームワーク)
    *   EJS (テンプレートエンジン)
    *   MySQL (データベース)

---

### スライド3: 全体構造 (Architecture)
*   Webアプリの基本的な仕組み「MVC」を意識しよう
    *   **M (Model)**: データベース (今回は `routes` 内で直接アクセス)
    *   **V (View)**: 画面表示 (`views/index.ejs`)
    *   **C (Controller)**: 処理の制御 (`routes/index.js`)

**[図: ブラウザ <-> app.js <-> routes/index.js <-> データベース]**

---

### スライド4: アプリの土台 (`app.js`)
*   サーバーの設定ファイル
*   **主な役割**:
    *   Expressの起動
    *   設定 (Viewエンジンなど)
    *   ミドルウェア (リクエストの解析など)
    *   ルーターの登録 (`app.use('/', indexRouter)`)

```javascript
// app.js より抜粋
const express = require('express');
const app = express();
app.set('view engine', 'ejs'); // EJSを使う設定
app.use('/', indexRouter);     // ルートへのアクセスをindexRouterに任せる
```

---

### スライド5: 見た目を作る (`views/index.ejs`)
*   HTMLの中にJavaScriptを埋め込める
*   **ポイント**:
    *   `<%= variable %>`: 変数の値を表示
    *   `<% code %>`: JSのロジック実行 (if文, forEachなど)

```html
<!-- views/index.ejs より抜粋 -->
<ul>
    <% todos.forEach(todo => { %>
        <li><%= todo.task %></li>
    <% }); %>
</ul>
```

---

### スライド6: サーバーの処理 (`routes/index.js`) - 表示 (GET)
*   `/` にアクセスされた時の処理
*   **流れ**:
    1.  DBからタスク一覧を取得 (`SELECT *`)
    2.  取得したデータをViewに渡して描画 (`res.render`)

```javascript
router.get('/', async (req, res, next) => {
    // データベースから取得 (非同期処理)
    const [rows] = await pool.query('SELECT * FROM tasks');
    // 'index.ejs' に 'rows' を 'todos' として渡す
    res.render('index', { todos: rows });
});
```

---

### スライド7: サーバーの処理 (`routes/index.js`) - 追加 (POST)
*   フォームから送られたデータを受け取る
*   **流れ**:
    1.  `req.body` からデータ取り出し
    2.  DBに保存 (`INSERT`)
    3.  一覧画面に戻る (`res.redirect`)

```javascript
router.post('/add', async (req, res, next) => {
    const task = req.body.task; // フォームの name="task"
    await pool.query('INSERT INTO tasks (task) VALUES (?)', [task]);
    res.redirect('/');
});
```

---

### スライド8: サーバーの処理 (`routes/index.js`) - 削除
*   特定IDのタスクを消す
*   **ルートパラメータ**: `/delete/:id`
    *   URLの一部を変数として扱う
    *   例: `/delete/5` -> `req.params.id` は `5`

```javascript
router.post('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.redirect('/');
});
```

---

### スライド9: まとめ
*   **app.js**: アプリ全体の設定
*   **views/index.ejs**: ユーザーインターフェース (HTML + EJS)
*   **routes/index.js**: リクエスト処理とデータベース操作
*   **非同期処理**: データベース操作には `async/await` が必須

### Next Steps
*   バリデーションの追加 (空文字チェックなど)
*   デザインの改善 (CSS)
*   更新機能 (Update) の追加
