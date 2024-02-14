const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { promisify } = require("util");
async function protect(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    next(res.status(401).json({ error: "You are not logged in! Please log in to get access" }))
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // res.status(401).json({ error: "invalid token" });
  console.log(decoded);
  const stillUser = await User.findById(decoded.id);
  if (!stillUser) {
    c

  }
  if (stillUser.changPassword(decoded.iat)) {
    return next(
      res.status(401).json({ error: 'User recently changed password! Please log in again.' })
    );
  }

  req.user = stillUser;
  next();
}
function restrictTo(role) {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if ((req.user.role) !== role) {
      return next(
        res.status(403).json({ error: 'You do not have permission to perform this action' })
        // new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// module.exports = protect, restrictTo;

module.exports = {
  protect, restrictTo

}