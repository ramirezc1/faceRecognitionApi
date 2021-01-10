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
const auth = require("./controllers/authorization");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
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
  signin.signinAuthentication(db, bcrypt)(req, res);
});

app.post("/register", (req, res) => {
  register.handleRegister(db, bcrypt)(req, res);
});

app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleGetProfile(db)(req, res);
});

app.post("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});

app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(db)(req, res);
});

app.post("/imageUrl", auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port 3000");
});
