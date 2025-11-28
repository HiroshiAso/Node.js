# 基本設計書

## 1. システム構成図
本システムは、単一のNode.jsサーバー上で動作するWebアプリケーションである。

```mermaid
graph LR
    User[ユーザー(Browser)] -- HTTP Request --> Server[Node.js Server]
    Server -- HTTP Response (HTML) --> User
```

## 2. ソフトウェア構成
- **OS**: 任意（Windows/Mac/Linux/Dockerコンテナ）
- **Runtime**: Node.js (LTS推奨)
- **Web Framework**: Express
- **View Engine**: EJS

## 3. ディレクトリ構成設計
標準的なExpressアプリケーションの構成に準拠する。

```
omikuziApp/
├── bin/
│   └── www           # アプリケーション起動スクリプト（ポート設定等）
├── docs/             # 設計ドキュメント格納ディレクトリ
├── public/
│   ├── images/       # 画像ファイル（必要に応じて）
│   ├── javascripts/  # クライアントサイドスクリプト
│   └── stylesheets/
│       └── style.css # 共通スタイルシート
├── routes/
│   └── index.js      # メインルーティングおよびビジネスロジック
├── views/
│   ├── error.ejs     # エラーページ用テンプレート
│   └── index.ejs     # トップページ（おみくじ結果）用テンプレート
├── app.js            # アプリケーション本体（ミドルウェア設定等）
└── package.json      # プロジェクト設定・依存関係定義
```

## 4. 機能一覧

| 機能ID | 機能名 | 画面 | 説明 |
| :--- | :--- | :--- | :--- |
| FN-01 | トップページ表示 | トップページ | アクセス時に運勢を抽選し、結果を表示する。 |
| FN-02 | 再抽選 | トップページ | 「もう一度引く」ボタン押下により、ページを再読み込みして再抽選を行う。 |

## 5. 画面遷移図

```mermaid
graph TD
    Start((開始)) --> TopPage[トップページ<br>(おみくじ結果表示)]
    TopPage -- もう一度引く --> TopPage
```
