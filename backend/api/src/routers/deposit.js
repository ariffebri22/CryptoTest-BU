// routers/deposit.js
const express = require("express");
const router = express.Router();
const depositController = require("../controllers/depositController");

router.get("/", depositController.getAll);

module.exports = router;
