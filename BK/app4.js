const http = require('http');
const fs = require('fs');
 
 
const server = http.createServer((request, response) => {
 
  fs.readFile('./index.html', 'utf-8', (err, data) => {
   
    response.setHeader('Content-Type', 'text/html');
   
    response.write(data)
    response.end();
  });
});
 
 
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
 