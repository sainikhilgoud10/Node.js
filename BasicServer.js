var http = require('http');
var server = http.createServer(function (request, response) {
    console.log("connected");
    response.end("<html><body>hello world</body></html>");
});

server.listen(7000);