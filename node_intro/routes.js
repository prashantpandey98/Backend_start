let fs = require("fs");

const requestHandler = (req, res) => {
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
};

module.exports = requestHandler; //We export the function as a module like this and import the module wherever required

//multimple export via module as objects and can be accessed like object.handler or object.someText
// module.export = {
//     handler : requestHandler,
//     someText : "This text can be exported"
// }

//exports can also be done explicitely like-      We can also ommit module. if we want.
// module.exports.handler = requestHandler;
// module.exports.someText= "This text can be exported";
