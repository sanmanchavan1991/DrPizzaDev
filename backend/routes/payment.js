const express = require("express");
const { keyIdRazorPay, keySecreteRazorPay ,razorPayKey} = require("../keys");
const router = express.Router();
require("dotenv").config();
const shortid = require("shortid");
const Razorpay = require("razorpay");

/**
 * @route   POST routes/payment/razorpay
 * @desc    payment configuration
 * @access  Public
 */

 router.post("/razorpay", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: keyIdRazorPay,
    key_secret: keySecreteRazorPay,
  });
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    return res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(400).json({ msg: e.message });
  }
});


/**
 * @route   POST routes/payment/verification
 * @desc    payment verification
 * @access  Public
 */
router.post("/verification", (req, res) => {
  // do a validation
  try {

    console.log(req.body);

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", razorPayKey);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      console.log("save in DB");
      // process it
      //require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
      // pass it
    }
    return res.status(200).json({
      status: "ok",
    });
  } catch (error) {
    res.status(400).json({ msg: e.message });
  }
});


module.exports = router;
