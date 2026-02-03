const { Chambre } = require('../models');

exports.create = async (req, res) => {
  try {
    const chambre = await Chambre.create(req.body);
    res.status(201).json(chambre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const chambres = await Chambre.findAll();
    res.json(chambres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
