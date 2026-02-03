const express = require('express');
const router = express.Router();
const { Chambre } = require('../models');

// GET /chambres
router.get('/', async (req, res) => {
  try {
    const chambres = await Chambre.findAll();
    res.json(chambres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
