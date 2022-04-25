const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "kaushalmern$tack";
const fetchUser = require("../middlewares/fetchUser");

//Route:1 -> signup route : POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail().custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in user");
        }
      });
    }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt); // this method is promise.
    try {
      console.log(req.body);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      res.json({success:true,user:user});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Route 2->loginroute (authentication) : POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],

  async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Please try to login with correct credentials",
          });
      }
      const comparePassword = await bcrypt.compare(password, user.password); // it will return true or false
      if (!comparePassword) {
        return res
          .status(400)
          .json({
            success: false,
            message: "PLease try to login with correct credentials",
          });
      }
      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3-> Get loogedin user details : POST "/api/auth/getuser"
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
