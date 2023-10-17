const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes); // sets a common /admin for all middlewares in adminRoutes
app.use("/shop", shopRoutes); // sets a common /shop for all middleswares in shopRoutes...so now / will give page not found

//to add error page if no middleware works
app.use((req, res, next) => {
  res.status(404).send("<h1>The requested page was not found...</h1>");
});

app.listen(3000);
