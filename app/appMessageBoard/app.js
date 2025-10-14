const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');
function getFromClient(request, response) {
  var url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {

    case '/':
      response_index(request, response);
      break;

    case '/style.css':
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('no page...');
      break;
  }
}

var data = { msg: 'no message...' };

function response_index(request, response) {
  if (request.method == 'POST') {
    var body = '';
    request.on('data', (data) => {
      body += data;
    });

    request.on('end', () => {
      data = qs.parse(body);
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
}

function write_index(request, response) {
  var msg = "※伝言を表示します。"
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
}