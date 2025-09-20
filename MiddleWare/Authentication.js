const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header not found" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
