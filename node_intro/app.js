const http = require("http");

const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("This is a middleware");
  next();
});
app.use((req, res, next) => {
  console.log("This is a another middleware");
  res.send("{ key1: value }");
});

app.listen(3000);
