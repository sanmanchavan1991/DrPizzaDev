const express = require("express");
const {
  processPayment,
  verificationPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/payment/verification").get(isAuthenticatedUser, verificationPayment);

module.exports = router;