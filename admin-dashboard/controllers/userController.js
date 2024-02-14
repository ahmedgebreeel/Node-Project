const user = require("../models/userModel");
async function Adduser(req, res, next) {
  const { name, email, password, passwordConfirm, active } = req.body;

  try {

    const newUser = new user({ name, email, password, passwordConfirm, active });
    // const { name, email, password, passwordConfirm, active } = req.body;
    const savednewUser = await newUser.save();
    res.status(201).json(savednewUser);
  } catch (error) {
    res.status(400).json({ error: error.message });

  }


}

async function getusers(req, res, next) {
  console.log(req.headers);
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getusers, Adduser

}
