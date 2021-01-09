const handleGetProfile = (db) => (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, url } = req.body.formInput;
  db("users")
    .where({ id })
    .update({ name: name, age: age, url: url })
    .then((resp) => {
      if (resp) {
        res.json("success");
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error updating user"));
};

module.exports = {
  handleGetProfile: handleGetProfile,
  handleProfileUpdate: handleProfileUpdate,
};
