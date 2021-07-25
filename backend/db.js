const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const {mongoUrl} = "mongodb+srv://DrPizza:drpizza@drpizza.wvusq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

require('./models/UserSchema');
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