const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;
const {mongoUrl} = require('./keys');

require('./models/UserSchema');
require('./models/GallerySchema');
require('./models/MenuSchema');



app.options('*', cors()) // include before other routes

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });
const RequireAuth = require('./routes/routes');
const AuthRoutes = require('./routes/auth');
const GalleryRoutes = require('./routes/gallery');
const MenuRoutes = require('./routes/menu');
const ForgotPassRoutes = require('./routes/passwordReset');
app.use(express.json());
app.use(RequireAuth);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongodb Atlas');
});
mongoose.connection.on('error', (err) => {
  console.log('Not Connecting:', err);
});



app.use('/routes/auth', AuthRoutes);
app.use('/routes/gallery', GalleryRoutes);
app.use('/routes/menu', MenuRoutes);
app.use('/routes/passwordReset', ForgotPassRoutes);


// app.get('/', AuthRoutes, (req, res) => {
//   res.send({username: req.user.username});
// });

app.listen(PORT, () => {
  console.log('server running ' + PORT);
});