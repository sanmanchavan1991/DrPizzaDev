const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
mongoose.set('useFindAndModify', false);
const jwt = require('jsonwebtoken');
const jwtkey = "dsfeadsadfelki";
const router = express.Router();
const User = mongoose.model('UserSchema');
const Gallery = mongoose.model('GallerySchema');
const Menu = mongoose.model('MenuSchema');

var appDir = path.dirname(require.main.path);
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(appDir, '/public/img/MenuTab'))
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
});

var upload = multer({ storage: storage });

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
  router.get('/user', async (req, res) => {
    User.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
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

  router.post('/menu', upload.single('image'), async (req, res) => {  
    if (req.body !== undefined && req.body !== null) {
      try {
        const newMenuItem = new Menu({
          foodName: req.body.foodName, 
          foodDesc: req.body.foodDesc,
          foodPrice: req.body.foodPrice,
          foodSize: req.body.foodSize, 
          foodType: req.body.foodType,
          foodImage: req.file.filename,
          stockQuantity: req.body.stockQuantity,
        })
        await newMenuItem.save().then(() => res.send({response: 'ok'})).catch(err=> console.log("notsaved", err));
      }
      catch (err) {
        console.log(err);
        return res.status(422).send({error: 'Menu item not saved!'});
      }
    }  
    else {
      console.log("<<<<<<<<<<<<<<<WAITING>>>>>>>>>>>>>")
    }
  });

  router.get('/admin-user', (req, res) => {
    User.findOne({ isAdmin: true }, function (err, result) {
      if(err) {
        res.status(422).send({error: 'Admin user not found!'});
      }
      else {
        res.send(result);
      }
    });
  });

module.exports = router;