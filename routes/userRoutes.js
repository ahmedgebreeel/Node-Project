const router = require("express").Router();
<<<<<<< Updated upstream

const { getusers, Adduser } = require("../controllers/userController")
router.route("/").post(Adduser).get(getusers);


=======
const meddile = require("../middleware/authMiddleware");
// const { restrictTo } = require("../middleware/authMiddleware");
const { getusers, Adduser, updateUser, getUserByID, deleteUser } = require("../controllers/userController");
const { signup, login } = require("../controllers/authController")

router.route("/").post(meddile.protect, meddile.restrictTo("admin"), Adduser).get(meddile.protect, meddile.restrictTo("admin"), getusers);
router.route("/:id").post(meddile.protect, meddile.restrictTo("admin"), updateUser).get(meddile.protect, meddile.restrictTo("admin"), getUserByID).delete(meddile.protect, meddile.restrictTo("admin"), deleteUser)
router.route("/singUp").post(signup)
router.route("/login").post(login)

>>>>>>> Stashed changes
module.exports = router

