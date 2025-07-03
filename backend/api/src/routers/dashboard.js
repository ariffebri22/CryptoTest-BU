const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/chart/deposits", dashboardController.getDepositChartData);
router.get("/chart/registrations", dashboardController.getRegistrationChartData);
router.get("/summary", dashboardController.getDashboardSummary);

module.exports = router;
