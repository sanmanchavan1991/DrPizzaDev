const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const sendEmail = require("../utils/sendEmail");
const UserSchema = mongoose.model("UserSchema");
const { jwtkeyPassReset } = require("../keys");
const router = express.Router();
require("dotenv").config();

const staticRoute = "http://localhost:3001";
/**
 * @route   POST routes/passwordReset/sendEmail
 * @desc    sendEmail
 * @access  Public
 */
router.post("/sendEmail", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await UserSchema.findOne({ email });
    if (!user) throw Error("User does not exist");

    const token = jwt.sign({ id: user._id }, jwtkeyPassReset, {
      expiresIn: "20m",
    });
    if (!token) throw Error("Couldnt sign the token");

    let subject = "Password Reset Link";
    let html = `<h2>Please click on reset link to change the password</h2>
      <p2><a target="_blank"  rel="noopener noreferrer" href="${staticRoute}/resetPassword/${token}">${staticRoute}/resetPassword/${token}</a></p>
      `;
    await sendEmail(user.email, subject, html);
    user.updateOne({ resetLink: token },function(err,success){
      if(err)
      {
        console.log('Something went wrong while setting the resetLink')
        throw Error('Something went wrong while setting the resetLink');      }
    });
    return res
      .status(200)
      .json({ msg: "email sent to register emailId sucessfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


/**
 * @route   POST routes/passwordReset/reset-password
 * @desc    reset-password
 * @access  Public
 */
router.post("/reset-password", async (req, res) => {
  const { token,password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {


    const decoded = jwt.verify(token, jwtkeyPassReset);
    if (!decoded) throw Error('token is invalid or expired');

    const user = await UserSchema.findOne( {"resetLink" :token} );
    if (!user) throw Error('token is invalid or expired');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

  
    user.updateOne({ password: hash,resetLink: ''  },function(err,success){
      if(err)
      {
        console.log('Something went wrong while setting the password')
        throw Error('Something went wrong while setting the password');
      }
    });
    return res
      .status(200)
      .json({ msg: "password changed sucessfully ;please login with email Id and password" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
