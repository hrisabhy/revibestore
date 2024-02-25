const { Router } = require("express");
const Orders = require("../controllers/Orders");
const router = Router();
router.get("/orders/:page", Orders.getOrders);
router.get("/order-details/:id", Orders.orderDetails);
router.put("/order-deliver/:id", Orders.deliverOrder);
router.get("/orders", Orders.getOrders);
module.exports = router;
