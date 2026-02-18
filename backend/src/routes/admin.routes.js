const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.get("/stats", verifyToken, isAdmin, controller.getStats);

module.exports = router;
