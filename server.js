const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");

const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();

app.use(morgan("combined"));
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

/*
/ -> res= this is working
/signin -> POST =success/fail
/register ->POST = user
/profile/:userId -> GET =user
/image -> PUT-> user

*/
app.get("/", (req, res) => {
  res.send("it is working");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(db, bcrypt)(req, res);
});

app.post("/register", (req, res) => {
  register.handleRegister(db, bcrypt)(req, res);
});

app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(db)(req, res);
});

app.put("/image", (req, res) => {
  image.handleImage(db)(req, res);
});

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port 3000");
});
