const env = require("../config/envConfig");
const razorpayInstance = require("../config/razorpayInstance");
class PaymentController {
  async getKey(req, res) {
    try {
      res.json({ key: env.RAZOR_KEYID });
    } catch (error) {
      console.error("Error fetching Razorpay key:", error);
      res.status(500).json({ error: "Failed to fetch Razorpay key" });
    }
  }
  async initiatePayment(req, res) {
    try {
      const order = await razorpayInstance.orders.create({
        amount: Number(req.body.amount * 100),
        currency: req.body.currency || "INR",
      });
      console.log(order);
      // res.json({ orderId: order.id, success: true });
      res.json({ order, success: true });
    } catch (error) {
      console.error("Error initiating payment:", error);
      res.status(500).json({ error: "Failed to initiate payment" });
    }
  }
  async verifyPayment(req, res) {
    try {
      console.log(req.body);
      // const { paymentId } = req.body;

      // const payment = await razorpayInstance.payments.fetch(paymentId);

      // res.json({ status: payment.status });
      res.json({ status: "Success" });
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  }
}

module.exports = new PaymentController();
