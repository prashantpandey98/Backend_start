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
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      `<body><form action='/message' method='POST'><input type='text' name='message'><button>Submit</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method == "POST") {
    const data = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      data.push(chunk);
    });
    return req.on("end", () => {
      //we return here so that the code executes the callback before moving on and executing the next set of code as it normally does
      const parsedBody = Buffer.concat(data).toString();
      const message = parsedBody.split("=")[1].replaceAll("+", " ");

      fs.writeFile("message.txt", message, (err) => {
        //in writeFileSync the code will not move forward until the file is made, this can be problematic when file size is large so we use writeFile
        res.statusCode = 302;
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Enter Message</title><head>");
        res.write(
          `<body><h1>${message}</h1><form action='/message' method='POST'><input type='text' name='message'><button>Submit</button></form></body>`
        );
        res.write("</html>");
        return res.end();
      });
    });
  }
  if (url === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> First Node Page</title><head>");
    res.write("<body><h1>Form Submitted!<br>Welcome Home...</h1></body>");
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
