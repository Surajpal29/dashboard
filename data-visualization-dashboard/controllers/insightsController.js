// controllers/insightsController.js
const Insight = require("../models/Insight");

// Get all insights
exports.getAllInsights = async (req, res) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get insights with filters

exports.getFilteredInsights = async (req, res) => {
  try {
    // Extract filters from query parameters
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    // Construct filter object
    const filters = {};
    if (end_year) filters.end_year = end_year;
    if (topic) filters.topic = topic;
    if (sector) filters.sector = sector;
    if (region) filters.region = region;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (swot) filters.swot = swot; // Assuming 'swot' is a valid field
    if (country) filters.country = country;
    if (city) filters.city = city; // Assuming 'city' is a valid field

    console.log("Filters applied:", filters); // Log filters for debugging

    // Query the database with the constructed filters
    const insights = await Insight.find(filters);

    console.log("Insights found:", insights); // Log results for debugging
    res.status(200).json(insights);
  } catch (err) {
    console.error("Error fetching insights:", err); // Log error for debugging
    res.status(400).json({ message: err.message });
  }
};

exports.addInsight = async (req, res) => {
  try {
    // Check if req.body is an array
    if (Array.isArray(req.body)) {
      // Insert multiple documents
      const newInsights = await Insight.insertMany(req.body);
      res.status(201).json(newInsights);
    } else {
      // Insert a single document
      const insight = new Insight(req.body);
      const newInsight = await insight.save();
      res.status(201).json(newInsight);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
