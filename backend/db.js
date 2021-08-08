const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const {mongoUrl} = require('./keys');

require('./models/UserSchema');
require('./models/GallerySchema');
require('./models/MenuSchema');
const RequireAuth = require('./routes/routes');
const AuthRoutes = require('./routes/auth');
app.use(bodyParser.json());
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

app.get('/', AuthRoutes, (req, res) => {
  res.send({username: req.user.username});
});

app.listen(PORT, () => {
  console.log('server running ' + PORT);
});