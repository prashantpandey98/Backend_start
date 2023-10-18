const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve login form at /login path
app.get("/login", (req, res) => {
  res.send(
    '<form action="/" method="post"><label>Username: <input type="text" name="username"></label><button type="submit">Login</button></form>'
  );
});

// Handle chat form submission and display messages
app.post("/", (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  if (message) {
    // Save message to a file only if message is defined
    fs.appendFileSync("messages.txt", `${username}: ${message}\n`);
  }

  // Redirect to the chat page
  res.redirect(`/?username=${username}`);
});

// Serve chat page and display stored messages
app.get("/", (req, res) => {
  const username = req.query.username;

  if (!fs.existsSync("messages.txt")) {
    //if the file doesn,t already exist
    fs.writeFileSync("messages.txt", "");
  }

  const storedMessages = fs
    .readFileSync("messages.txt", "utf8")
    .split("\n")
    .filter(Boolean);

  res.send(`
    <h1>Welcome, ${username}!</h1>
    <div id="messages">
      ${
        storedMessages.length > 0
          ? storedMessages.map((message) => `<div>${message}</div>`).join("")
          : ""
      }
    </div>
    <form action="/" method="post">
      <input type="hidden" name="username" value="${username}">
      <input type="text" name="message" placeholder="Type your message...">
      <button type="submit">Send</button>
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
