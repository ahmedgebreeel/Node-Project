const user = require("../models/userModel");


async function Adduser(req, res, next) {
  const { name, email, password, passwordConfirm, active } = req.body;

  try {

    const newUser = new user({ name, email, password, passwordConfirm, active });
    // const { name, email, password, passwordConfirm, active } = req.body;
    const savednewUser = await newUser.save();
    res.status(201).json("user added successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });

  }


}

async function getusers(req, res, next) {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateUser(req, res) {
  const userId = req.params.id;
  const updates = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with that ID' });
      // console.log("no user");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function getUserByID(req, res) {
  const userId = req.params.id;
  try {
    const SpasificUSer = await user.findById(userId);
    if (!SpasificUSer) {
      return res.status(404).json({ message: 'No user found with that ID' });
      // console.log("no user");
    }
    res.status(200).json(SpasificUSer);
    return userId
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


async function deleteUser(req, res) {

  try {
    const userId = req.params.id;
    console.log(userId);
    const deletedUser = await user.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found with that ID' });
      // console.log("no user");
    }
    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


async function deactive(req, res, next) {
  try {
    const deactiveUser = await user.findByIdAndUpdate(req.params.id, { active: false });
    res.status(204).json(deactiveUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getusers, Adduser, updateUser, getUserByID, deleteUser, deactive


}
