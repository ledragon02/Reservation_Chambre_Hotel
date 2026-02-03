const { Chambre } = require('../models');

// GET toutes les chambres
exports.getAllChambres = async (req, res) => {
  const chambres = await Chambre.findAll();
  res.json(chambres);
};

// GET une chambre par ID
exports.getChambreById = async (req, res) => {
  const chambre = await Chambre.findByPk(req.params.id);
  if (!chambre) {
    return res.status(404).json({ error: 'Chambre non trouvée' });
  }
  res.json(chambre);
};

// POST créer une chambre
exports.createChambre = async (req, res) => {
  try {
    const chambre = await Chambre.create(req.body);
    res.status(201).json(chambre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT modifier une chambre
exports.updateChambre = async (req, res) => {
  try {
    const chambre = await Chambre.findByPk(req.params.id);
    if (!chambre) {
      return res.status(404).json({ error: 'Chambre non trouvée' });
    }

    await chambre.update(req.body);
    res.json(chambre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE supprimer une chambre
exports.deleteChambre = async (req, res) => {
  const chambre = await Chambre.findByPk(req.params.id);
  if (!chambre) {
    return res.status(404).json({ error: 'Chambre non trouvée' });
  }

  await chambre.destroy();
  res.json({ message: 'Chambre supprimée avec succès' });
};
