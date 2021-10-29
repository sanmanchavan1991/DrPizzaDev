const mongoose = require("mongoose");
const validator = require("validator");

const MenuModel = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Please enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should be more than 3 characters"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please enter your Description"],
    minLength: [10, "Name should be more than 10 Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Menu Price"],
    maxLength: [8, "Menu Price cannot exceed 8 characters"],
  },
  category: {
    type: String,
    required: [true, "Please enter your Menu Category"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "UserSchema",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  Stock: {
    type: Number,
    required: [true, "Please enter Menu Stock"],
    maxLength: [4, "Menu Stock cannot exceed 4 characters"],
    default: 1,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserSchema",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MenuSchema", MenuModel);
