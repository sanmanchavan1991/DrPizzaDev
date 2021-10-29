const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const connectDatabase  = require("./configuration/db");
const errorMiddleware = require("./middleware/error");

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY ,CLOUDINARY_API_SECRET}  = require("./configuration/keys");

const PORT = process.env.PORT || 3000;

const app = express();


app.options('*', cors()) // include before other routes

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(fileUpload());
  

connectDatabase();  
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});




// Route Imports
const user = require("./routes/userRoutes");
const menu = require("./routes/menuRoutes");
const order = require("./routes/orderRoutes");


app.use("/api", user);
app.use("/api", menu);
app.use("/api", order);

app.use(errorMiddleware);
















const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
