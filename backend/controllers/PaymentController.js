const env = require("../config/envConfig");
const razorpayInstance = require("../config/razorpayInstance");
const crypto = require("node:crypto");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
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
      const {
        items,
        address,
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZOR_SECRET)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
      if (isAuthentic) {
        items.forEach(async (item) => {
          try {
            await OrderModel.create({
              productId: item.productId,
              userId,
              size: item.size,
              color: item.color,
              quantities: item.quantity,
              address,
            });
            const product = await ProductModel.findOne({ _id: item.productId });
            if (product) {
              let stock = product.stock - item.quantity;
              if (stock < 0) {
                stock = 0;
              }
              await ProductModel.findByIdAndUpdate(
                item.productId,
                { stock },
                { new: true }
              );
            }
          } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error");
          }
        });
        res.redirect("http://localhost:5173/user");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  }
}

module.exports = new PaymentController();
