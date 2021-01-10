const { compareSync } = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

// Redis Setup
const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

// const redisClient = redis.createClient(
//   "redis://:p77611edf4dc0827b3fd34d3a6596534629adec262e69b9eb3c56b927aae237fb@ec2-3-225-193-136.compute-1.amazonaws.com:17649"
// );

const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, "JWT_SECRET_KEY", { expiresIn: "2 days" });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  console.log("toke " + token);
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token, user };
    })
    .catch(console.log);
};

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch((err) => Promise.reject("unable to get user"));
      } else {
        return Promise.reject("wrong credentials");
      }
    })
    .catch((err) => Promise.reject("wrong credentials"));
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send("Unauthorized");
    }
    return res.json({ id: reply });
  });
};

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, req, res)
        .then((data) =>
          data.id && data.email ? createSession(data) : Promise.reject(data)
        )
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  signinAuthentication: signinAuthentication,
  redisClient: redisClient,
  setToken: setToken,
  signToken: signToken,
};
