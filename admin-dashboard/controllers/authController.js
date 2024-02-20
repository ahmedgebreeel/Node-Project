const User = require("../models/userModel");
// const http=require("http")
const jwt = require("jsonwebtoken")

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
async function signup(req, res, next) {
  const { name, email, password, passwordConfirm, active } = req.body;
  try {
    const newUser = new User({ name, email, password, passwordConfirm, active });
    const savednewUser = await newUser.save();
    const token = signToken(newUser._id);
    res.writeHead(201, { token })
    res.write("sign successfully")
    res.end();
    // res.status(201).json({ token, savednewUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function login(req, res, next) {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password is required" })
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPass(password, user.password)//true //false
    if (!user || !correct) {
      return res.status(401).json({ error: "Email or password is not correct" })

    }
    if (user || correct) {  //true //true  //true //false falsee //false
      const token = signToken(user.id);
      // res.status(200).json({ token });
      res.writeHead(200, { token })
      res.write("login successfully")
      res.end();
    }

  } catch (error) {
    res.status(401).json({ error: "Email or password is not correct" })

  }

}

module.exports = {
  signup, login

}
