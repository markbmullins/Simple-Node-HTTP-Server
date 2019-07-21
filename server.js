const fs = require('fs');
const http = require('http');
const path = require('path');

const SERVER_PORT = process.env.PORT || 5001;

const server = http.createServer((request, response) => {
  // Route request to root or requested page
  const simpleRouter = request.url === '/' ? 'index.html' : request.url;
  let filePath = path.join(__dirname, 'pages', simpleRouter);

  const fileExtention = path.extname(filePath);

  let contentType = 'text/html';
  switch (fileExtention) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
  }

  if (fileExtention == '' && contentType == 'text/html') {
    filePath += '.html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.readFile(
          path.join(__dirname, 'pages', '404.html'),
          (err, content) => {
            if (err) {
              console.log("Can't load 404 Page");
              response.end();
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf8');
          }
        );
      } else {
        path.join(__dirname, 'pages', '404.html');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf8');
    }
  });
});

server.listen(SERVER_PORT, () =>
  console.log(`Starting server on port ${SERVER_PORT}`)
);
