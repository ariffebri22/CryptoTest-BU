// routers/index.js
const express = require("express");
const router = express.Router();
const Deposit = require("./deposit");
const Member = require("./member");
const Dashboard = require("./dashboard");

router.use("/deposits", Deposit);
router.use("/members", Member);
router.use("/dashboard", Dashboard);

module.exports = router;
