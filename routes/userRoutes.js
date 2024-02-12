const router = require("express").Router();

const { getusers, Adduser } = require("../controllers/userController");
const { signup } = require("../controllers/authController")

router.route("/").post(Adduser).get(getusers);
router.route("/singUp").post(signup)


module.exports = router

