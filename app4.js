const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    fs.readFile('index2.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const data = querystring.parse(body);
      console.log('名前:', data.name);
      console.log('メールアドレス:', data.email);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('success');
    });
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
