const User = require("../models/userModel");
const jwt = require("jsonwebtoken")


async function signup(req, res, next) {
  const { name, email, password, passwordConfirm, active } = req.body;
  try {
    const newUser = new User({ name, email, password, passwordConfirm, active });
    const savednewUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(201).json({ token, savednewUser });
  } catch (error) {
    res.status(400).json({ error: error.message });

  }


}
module.exports = {
  signup

}
