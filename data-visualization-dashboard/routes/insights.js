// routes/insights.js
const express = require("express");
const router = express.Router();
const {
  getAllInsights,
  getFilteredInsights,
  addInsight,
} = require("../controllers/insightsController");

// GET all insights
router.get("/", getAllInsights);

// GET insights with filters
router.get("/filter", getFilteredInsights);

// POST a new insight (if you need to add data)
router.post("/", addInsight);

module.exports = router;
