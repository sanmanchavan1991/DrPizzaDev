const mongoose = require("mongoose");
const OrderModel = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    landMark: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuSchema",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserSchema",
    required: true,
  },
  paymentInfo: [{
    id: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    timeOfPayment: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  }],
  paymentSignature: {
    type: String,
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discountPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OrderSchema", OrderModel);
