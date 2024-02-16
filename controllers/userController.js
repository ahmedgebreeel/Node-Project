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


<<<<<<< Updated upstream
module.exports = {
  getusers, Adduser
=======
// }
async function updateUser(req, res) {
  const userId = req.params.id;
  const updates = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(userId, updates, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function getUserByID(req, res) {
  const userId = req.params.id;
  try {
    const SpasificUSer = await user.findByIdAndUpdate(userId);
    res.json(SpasificUSer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
async function deleteUser(req, res) {

  try {
    const userId = req.params.id;
    console.log(userId);
    const deletedUser = await user.find({ userId });
    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};
module.exports = {
  getusers, Adduser, updateUser, getUserByID, deleteUser

>>>>>>> Stashed changes

}
