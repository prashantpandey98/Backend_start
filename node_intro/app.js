const http = require("http");
const routes = require("./routes"); //importing the local file so we write ./ before the file name

const server = http.createServer(routes);

server.listen(3000);
