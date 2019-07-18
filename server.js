const fs = require('fs');
const http = require('http');
const path = require('path');

const SERVER_PORT = process.env.PORT || 5001;
const STATUS_CODE = {
    "OK": 200,
    "BAD_REQUEST": 400,
    "INTERNAL_SERVER_ERROR": 500,
};

const server = http.createServer((request, response) => {

    // Route request to root or requested page
    const simpleRouter = request.url === "/" ? "index.html" : request.url;
    let filePath = path.join(__dirname, "pages", simpleRouter);

    const fileExtention = path.extName(filePath);

    let contentType = '';
    switch (fileExtention) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        default:
            contentType = "text/html";
    }

    if (fileExtention == "" && contentType == "text/html") {
        filePath += ".html";
    }

    fs.readFile(filePath, (err, content) => {
        if (!err) {
            response.writeHead(STATUS_CODE.OK, { "Content-Type": "text/html" });
            response.end(content, "utf8");
        }
        if (err.code === "ENOENT") {

        } else {
            path.join(__dirname, "pages", "404.html");

        }
    });

});

server.listen(SERVER_PORT, () => console.log(`Starting server on port ${SERVER_PORT}`))