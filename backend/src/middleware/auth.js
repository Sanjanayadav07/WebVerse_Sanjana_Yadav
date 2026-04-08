/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.userId; // ✅ only ID store karo

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};*/
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(
      token.replace("Bearer ", ""), 
      process.env.JWT_SECRET || "supersecretkey123"
    );

    // ✅ Must be object with _id
    req.user = { _id: decoded.userId }; 

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};