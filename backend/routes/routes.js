const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const jwt = require('jsonwebtoken');
const jwtkey = "dsfeadsadfelki";
const router = express.Router();
const User = mongoose.model('UserSchema');

router.post('/signup', async (req, res) => {
    const {username, phone, email, password} = req.body;
    try {
      const user = new User({username, phone, email, password});
      await user.save();
      const token = jwt.sign({userId: user._id}, jwtkey);
      const id = user._id;
      res.send({token, id});
    } catch (err) {
      return res.status(422).send(err.message);
    }
  });
  
  router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
      console.log('no email or password found!');
    }
    const user = await User.findOne({email});
    try {
      await user.comparePassword(password);
      const token = jwt.sign({userId: user._id}, jwtkey);
      const id = user._id;
      res.send({token, id});
    } catch (err) {
      return res.status(422).send({error: 'must provide email or password'});
    }
  });
  module.exports = router;