const user = require("../models/userModel");

async function Adduser(req, res, next) {
  const { name, role, email, password, active } = req.body;

  try {

    const newUser = new user({ name, role, email, password, active });
    const savednewUser = await newUser.save();
    res.status(201).json(savednewUser);
  } catch (error) {
    res.status(400).json({ error: error.message });

  }


}

async function getusers(req, res, next) {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getusers, Adduser

}
