const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const word = token.split(" ");
  const jwtToken = word[1];

  try {
    const decodedValue = jwt.verify(jwtToken, JWT_Secret);
    if (decodedValue.username) {
      next();
    } else {
      res.json({
        msg: "you are not authenticated",
      });
    }
  } catch (e) {
    res.status(403).json({
      msg: "incorrect inputs",
    });
  }
}

module.exports = adminMiddleware;
