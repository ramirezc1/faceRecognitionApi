const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl:true


  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

/*
/ -> res= this is working
/signin -> POST =success/fail
/register ->POST = user
/profile/:userId -> GET =user
/image -> PUT-> user

*/
app.get("/", (req, res) => {
 res.send('it is working');
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
