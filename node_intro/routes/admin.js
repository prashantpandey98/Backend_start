const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  // /admin/add-product => GET request
  res.sendFile(path.join(rootDir, "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  // /admin/add-product => POST request
  console.log(JSON.stringify(req.body));
  res.redirect("/");
});

module.exports = router;
