const express = require("express");
const statisticsController = require("../controllers/statisticsController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/revenue-statistics")
  .get(statisticsController.getRevenueStatistics);

router
  .route("/average-order-value")
  .get(statisticsController.getAverageOrderValue);

router.route("/order-statistics").get(statisticsController.getOrderStatistics);

router.route("/revenue-by-table").get(statisticsController.getRevenueByTable);

router
  .route("/revenue-by-payment-method")
  .get(statisticsController.getRevenueByPaymentMethod);

router
  .route("/menu-item-statistics")
  .get(statisticsController.getMenuItemStatistics);

router
  .route("/best-selling-menu-item")
  .get(statisticsController.getBestSellingMenuItem);

router
  .route("/promotion-statistics")
  .get(statisticsController.getPromotionStatistics);
4;

router
  .route("/promotion-usage-statistics")
  .get(statisticsController.getPromotionUsageStatistics);

router
  .route("/most-valuable-customer")
  .get(statisticsController.getMostValuableCustomer);

module.exports = router;
