// required
require("dotenv").config();
const { json } = require("body-parser");
const express = require("express");
const session = require("express-session");

// middleware goes here
const checkForSession = require("./middlewares/checkForSession");

// controllers go here
const sc = require("./controllers/swag_controller");
const ac = require("./controllers/auth_controller");
const cc = require("./controllers/cart_controller");
const searchc = require("./controllers/search_controller");

const app = express();

// top level middleware;
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession); //custom middleware
app.use(express.static(`${__dirname}/build`));

// endpoints for swag controller
app.get("/api/swag", sc.read);

// endpoints for auth_controller
app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.post("/api/signout", ac.signout);
app.get("/api/user", ac.getUser);

// endpoints for cart_controller
app.post("/api/cart", cc.add);
app.post("/api/cart/checkout", cc.checkout);
app.delete("/api/cart", cc.delete);

// endpoint for search_controller
app.get("/api/search", searchc.search);
// listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ok ${port}`);
});
