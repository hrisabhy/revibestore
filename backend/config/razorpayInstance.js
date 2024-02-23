const Razorpay = require("razorpay");
const env = require("./envConfig");

const razorpayInstance = new Razorpay({
  key_id: env.RAZOR_KEYID,
  key_secret: env.RAZOR_SECRET,
});

module.exports = razorpayInstance;
