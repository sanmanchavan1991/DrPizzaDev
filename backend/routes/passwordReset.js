const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth =require('../middleware/auth');
const sendEmail = require("../utils/sendEmail");
const UserSchema = mongoose.model('UserSchema');
const {jwtkeyPassResetjwtkey} = require('../keys');
const router = express.Router();


const staticRoute="http://localhost:3001"
/**
 * @route   POST routes/password/forgotPassword
 * @desc    forgotPassword
 * @access  Public
 */
 router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
  
    // Simple validation
    if (!email ) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await UserSchema.findOne({ email });
      if (!user) throw Error('User does not exist');
    
      const token = jwt.sign({ id: user._id }, jwtkeyPassResetjwtkey, { expiresIn: "20m" });
      if (!token) throw Error('Couldnt sign the token');
  
      const data={
        from:'noreply@drPizza.com',
        to:email,
        subject:'Password Reset Link',
        html:`<h2>Please click on reset link to change the password</h2>
        <p2>${staticRoute}/resetPassword/${token}</p>
        `

      }
      let html=`<h2>Please click on reset link to change the password</h2>
      <p2>${staticRoute}/resetPassword/${token}</p>
      `;
      await sendEmail(user.email, "Password Reset Link", html);

      return user.updateOne({resetLink:token},(err,success))
      {
        if(err)
        {
          res.status(400).json({ msg: e.message });
        }
      }
      
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
  