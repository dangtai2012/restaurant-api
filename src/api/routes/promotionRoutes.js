const express = require("express");
const promotionsController = require("../controllers/promotionsController");
const authController = require("../controllers/authController");

const router = express.Router();
router
  .route("/:id")
  .get(authController.protect, promotionsController.getPromotion);
router
  .route("/")
  .get(authController.protect, promotionsController.getPromotions);
router.use(authController.protect, authController.restrictTo("admin"));

router.route("/").post(promotionsController.createPromotion);
router.route("/:id").patch(promotionsController.updatePromotion);
router.route("/:id").delete(promotionsController.deletePromotion);

router
  .route("/update-status/:id")
  .patch(promotionsController.updatePromotionStatus);
router.route("/reset-promotion").post(promotionsController.resetAllPromotions);
module.exports = router;
