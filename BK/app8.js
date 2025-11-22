const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const path = require('path');

const PORT = process.env.PORT || 3000;
const viewRoot = path.join(__dirname, 'views');
const cssRoot = path.join(__dirname, 'css');

const templates = {
  home: fs.readFileSync(path.join(viewRoot, 'home.ejs'), 'utf-8'),
  about: fs.readFileSync(path.join(viewRoot, 'about.ejs'), 'utf-8'),
  faq: fs.readFileSync(path.join(viewRoot, 'faq.ejs'), 'utf-8')
};

const headerCss = fs.readFileSync(path.join(cssRoot, 'header.css'));

const faqItems = [
  {
    question: 'Q. パーシャルを編集すると全ページに反映されますか？',
    answer: 'A. はい。`views/partials/header.ejs` や `views/partials/data_item.ejs` を更新すれば共通部分に反映されます。'
  },
  {
    question: 'Q. リストに質問を追加するには？',
    answer: 'A. app8.js 内の `faqItems` 配列にオブジェクトを追加するだけで、画面に自動で表示されます。'
  },
  {
    question: 'Q. 他のページでもデータを共有できますか？',
    answer: 'A. 同じように配列データを用意し、パーシャルを使えば再利用しやすくなります。'
  }
];

const render = (viewName, data) => {
  const filename = path.join(viewRoot, `${viewName}.ejs`);
  return ejs.render(templates[viewName], data, { filename });
};

const getFromClient = (request, response) => {
  const urlParts = url.parse(request.url, true);
  const currentPath = urlParts.pathname;

  switch (currentPath) {
    case '/css/header.css':
      response.writeHead(200, { 'Content-Type': 'text/css; charset=UTF-8' });
      response.end(headerCss);
      break;

    case '/':
      response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      response.end(render('home', { currentPath, pageTitle: 'ホーム画面' }));
      break;

    case '/about':
      response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      response.end(render('about', { currentPath, pageTitle: 'このサイトについて画面' }));
      break;

    case '/faq':
      response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      response.end(
        render('faq', {
          currentPath,
          pageTitle: 'よくある質問画面',
          faqItems
        })
      );
      break;

    default:
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      response.end('ページが見つかりませんでした。');
  }
};

const server = http.createServer(getFromClient);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

module.exports = { server, getFromClient };
