# ベースイメージとして軽量なNode.jsを指定
FROM node:18-alpine

# コンテナ内の作業ディレクトリを設定
WORKDIR /usr/src/app

# パッケージ定義ファイルをコピー
COPY package*.json ./

# 依存パッケージをインストール（本番用のみ）
RUN npm install --production

# アプリケーションのソースコードをコピー
COPY . .

# 環境変数の設定
ENV NODE_ENV=production
ENV PORT=3000

# 公開するポートを指定
EXPOSE 3000

# アプリケーションの起動コマンド
CMD ["npm", "start"]
