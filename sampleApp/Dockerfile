# 軽量なNode.jsランタイムイメージを使用
FROM node:18-alpine

# コンテナ内の作業ディレクトリを設定
WORKDIR /usr/src/app

# 本番環境用の依存関係のみをインストール
# package.json と package-lock.json をコピー
COPY package*.json ./
# 依存関係のインストール（開発用依存関係は除外）
RUN npm install --production

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションが期待する環境変数を設定
ENV NODE_ENV=production
ENV PORT=3000

# Expressアプリが使用するポートを公開
EXPOSE 3000

# Expressサーバーを起動
CMD ["npm", "start"]
