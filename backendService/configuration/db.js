const mongoose = require("mongoose");
const {mongoUrl} = require('./keys');

 const connectDatabase = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

  }).then((data) => {
    console.log(`connected to mongodb Atlas: ${data.connection.host}`);

  });
};
module.exports = connectDatabase;
