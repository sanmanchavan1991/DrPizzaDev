
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail   = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler");
const OrderSchema = require("../models/orderModel");
const crypto = require("crypto");
const Razorpay = require("razorpay");


const { keyIdRazorPay, keySecreteRazorPay ,razorPayKey} = require("../configuration/keys");



exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: keyIdRazorPay,
    key_secret: keySecreteRazorPay,
  });
  const orderId=req.body.orderId
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";
  const typeOfPayment=req.body.typeOfPayment// PayNow or COD
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  const response = await razorpay.orders.create(options);
  const order = await OrderSchema.findById(orderId);
      order.paymentInfo.push({
        id: response.id,
        timeOfPayment:Date.now(),
        status:'payment initiated'
      });
    order.paymentSignature=response.id;
      await order.save({ validateBeforeSave: false });
  console.log(response);
  //payment id push whenever payment is generated  menu.reviews.push(review);
  res.status(200).json({
    success: true,
    id: response.id,
    currency: response.currency,
    amount: response.amount,
  });
});


  exports.verificationPayment = catchAsyncErrors(async (req, res, next) => {
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
     // const order = await OrderSchema.find( { $and: [ { field1: "hi" }, { field1: "hello" } ] } );
      const order = await OrderSchema.find( { 'paymentSignature': digest }  ) ;

      order.paymentInfo.push({
        id: order.paymentInfo,
        timeOfPayment:Date.now(),
        status:'successful'
      });
    
      await order.save({ validateBeforeSave: false });

    } else {
      // const order = await OrderSchema.findById(id);
      // order.paymentInfo.push({
      //   id: order.paymentInfo,
      //   timeOfPayment:Date.now(),
      //   status:'unsuccessful'
      // });
    
      // await order.save({ validateBeforeSave: false });
      console.log("Issue while confirming payment");
    }
    res.status(200).json({
      success: true,
      status:"ok",
    });
  });