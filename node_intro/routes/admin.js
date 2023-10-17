const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  // /admin/add-product => GET request
  console.log("This is a another middleware");
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="product"><input type="number" name="size"><button type="submit">Add Product</button></form>'
  );
});

router.post("/add-product", (req, res, next) => {
  // /admin/add-product => POST request
  console.log(JSON.stringify(req.body));
  res.redirect("/");
});

module.exports = router;
