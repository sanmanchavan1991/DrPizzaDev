const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const jwt = require('jsonwebtoken');
const jwtkey = "dsfeadsadfelki";
const router = express.Router();
const User = mongoose.model('UserSchema');
const Gallery = mongoose.model('GallerySchema');
const Menu = mongoose.model('MenuSchema');

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

  router.get('/gallery', (req, res) => {
    Gallery.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.post('/gallery', async (req, res) => {
    const {name, descirption, itemType, image} = req.body;

    try {
      const newGalleryItem = new Gallery({
        name, 
        descirption, 
        itemType, 
        image
      });
      await newGalleryItem.save().then(() =>  res.send({response: 'ok'}));
    }
    catch (err) {
      return res.status(422).send({error: 'Gallery item not saved!'});
    }
  });

  router.get('/menu', (req, res) => {
    Menu.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    })
  });

  router.post('/menu', async (req, res) => {
    const {foodName, foodDesc, foodPrice, foodSize, foodType, foodImage} = req.body;

    try {
      const newMenuItem = new Menu({
        foodName, foodDesc, foodPrice, foodSize, foodType, foodImage
      })
      await newMenuItem.save().then(() => res.send({response: 'ok'}));
    }
    catch (err) {
      console.log(err);
      return res.status(422).send({error: 'Menu item not saved!'});
    }
  });
  module.exports = router;