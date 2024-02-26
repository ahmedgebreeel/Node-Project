const router = require("express").Router();
const meddile = require("../middleware/authMiddleware");
// const { restrictTo } = require("../middleware/authMiddleware");
const { getusers, Adduser } = require("../controllers/userController");
const { signup, login } = require("../controllers/authController")

router.route("/").post(meddile.protect, meddile.restrictTo("admin"), Adduser).get(meddile.protect, meddile.restrictTo("admin"), getusers);
router.route("/singUp").post(signup)
router.route("/login").post(login)



module.exports = router

