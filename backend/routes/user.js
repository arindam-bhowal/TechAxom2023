const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateAccessToken, verify } = require("../config/verifyToken");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      req.body.password = hashedPassword;

      const newUser = new User(req.body);
      await newUser.save();

      res.status(200).json({message: 'User Registered Successfully!!'});
    } else {
      res.status(409).json('User already exists')
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user !== null) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = generateAccessToken(user);
        res.json({
          user_id: user._id,
          token,
        });
      } else {
        //  Password error
        res.status(403).json('Credentials mismatch');
      }
    } else {
      // User Not found
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

// Get user details

router.get("/get", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json('User not found!!');
    } else {
      const { password, ...otherInfo } = user._doc;
      res.status(200).json(otherInfo);
    }
  } catch (error) {
    res.status(500).json(error)
  }
});


// -------Check Login ----------

router.get('/check_login', verify, (req, res) => {
  try {
    res.status(200).json('Success')
  } catch (error) {
    res.status(500).json(error)
  }
})

  
module.exports = router