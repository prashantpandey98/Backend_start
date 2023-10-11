const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  // // process.exit()   - It exits the event loop and stops the app running once the code above it has executed.

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> First Node Page</title><head>");
    res.write("<body><h1>This is Default Page</h1></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> First Node Page</title><head>");
    res.write("<body><h1>Welcome Home</h1></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> First Node Page</title><head>");
    res.write("<body><h1>Welcome to About Us Page</h1></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/node") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> First Node Page</title><head>");
    res.write("<body><h1>Welcome to My Node JS Project</h1></body>");
    res.write("</html>");
    return res.end();
  }
});

server.listen(3000);
