const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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

module.exports = userMiddleware;
