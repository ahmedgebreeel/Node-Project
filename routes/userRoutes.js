const router = require("express").Router();

const { getusers, Adduser } = require("../controllers/userController");
router.route("/").post(Adduser).get(getusers);

module.exports = router;
