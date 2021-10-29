const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {jwtkey,jwtkeyPassReset} = require('../configuration/keys');

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should be more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, //this will ignore this property when we are accessing User object
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number"],
    unique: true,
    minLength: [10, "Phone Number should be greater than 10 characters"],
  },
  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpire: {
    type: Date,
  },
});


//this function will get called whenever we are trying to save UserSchema
UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
UserModel.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, jwtkey, {
    expiresIn: 3600,
  });
};

// Compare Password

UserModel.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
UserModel.methods.getResetPasswordToken = function () {
  // Generating Token
  
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("UserSchema", UserModel);

