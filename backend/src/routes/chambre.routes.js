const express = require('express');
const router = express.Router();
const { Chambre } = require('../models');

// GET toutes les chambres
router.get('/', async (req, res) => {
  const chambres = await Chambre.findAll();
  res.json(chambres);
});

// POST créer une chambre
router.post('/', async (req, res) => {
  try {
    const chambre = await Chambre.create(req.body);
    res.status(201).json(chambre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
