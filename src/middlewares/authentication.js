const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, "thisIsKey");
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
module.exports = authenticate;
