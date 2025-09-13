const http = require('http');
const server = http.createServer(
  (request, response) => {
    response.end('HiroshiTsuda');
  }
);
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});