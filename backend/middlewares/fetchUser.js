const jwt = require("jsonwebtoken");
const JWT_SECRET = "kaushalmern$tack";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ message: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data)
    req.session.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
