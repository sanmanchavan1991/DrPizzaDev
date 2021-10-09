const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth =require('../middleware/auth');

const UserSchema = mongoose.model('UserSchema');
const {jwtkey} = require('../keys');
const router = express.Router();


/**
 * @route   POST routes/auth/login
 * @desc    Login user
 * @access  Public
 */
 router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await UserSchema.findOne({ email });
    if (!user) throw Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, jwtkey, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      },
      msg: 'success'
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST routes/auth/register
 * @desc    Register new user
 * @access  Public
 */

 router.post('/register', async (req, res) => {
  const { fullName, phoneNumber,email, password } = req.body;

  // Simple validation
  if (!fullName || !phoneNumber || !email || !password  ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await UserSchema.findOne({ email });
    if (user) throw Error('User already exists with emailId');
    
    const userPhone = await UserSchema.findOne({"phone" :phoneNumber});
    if (userPhone) throw Error('User already exists with phone');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new UserSchema({
      username:fullName,
      email:email,
      phone:phoneNumber,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, jwtkey, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
      , msg: 'success' 

    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET routes/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user',  async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');

    res.status(200).json({
     user: user
      , msg: 'success' 

    });
    
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
module.exports = router;