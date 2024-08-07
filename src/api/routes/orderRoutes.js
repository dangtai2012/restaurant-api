const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const promotionController = require("../controllers/promotionsController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(promotionController.checkPromotionCode, orderController.getOrders)
  .post(
    authController.restrictTo("staff", "client"),
    orderController.createOrder
  );

router
  .route("/items/:menuItemId")
  .patch(
    authController.restrictTo("staff", "client"),
    orderController.updateStatusItem
  )
  .delete(
    authController.restrictTo("staff", "client"),
    orderController.deleteOrderItem
  );

router
  .route("/update-status/:itemId")
  .patch(authController.restrictTo("staff"), orderController.updateItemStatus);

module.exports = router;
