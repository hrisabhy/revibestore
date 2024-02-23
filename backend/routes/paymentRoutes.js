const express = require("express");
const router = new express.Router();
const PaymentController = require("../controllers/PaymentController");
router.get("/payment/getkey", PaymentController.getKey);
router.post("/payment/initiate", PaymentController.initiatePayment);
router.post("/payment/verify", PaymentController.verifyPayment);
module.exports = router;
