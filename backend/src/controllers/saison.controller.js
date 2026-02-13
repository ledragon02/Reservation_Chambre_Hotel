const { Saison } = require('../models');

exports.getAll = async (req, res) => {
  const saisons = await Saison.findAll();
  res.json(saisons);
};

exports.getOne = async (req, res) => {
  const saison = await Saison.findByPk(req.params.id);
  if (!saison) {
    return res.status(404).json({ error: 'Saison non trouvée' });
  }
  res.json(saison);
};

exports.create = async (req, res) => {
  try {
    const saison = await Saison.create(req.body);
    res.status(201).json(saison);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const saison = await Saison.findByPk(req.params.id);
  if (!saison) {
    return res.status(404).json({ error: 'Saison non trouvée' });
  }

  await saison.update(req.body);
  res.json(saison);
};

exports.remove = async (req, res) => {
  const saison = await Saison.findByPk(req.params.id);
  if (!saison) {
    return res.status(404).json({ error: 'Saison non trouvée' });
  }

  await saison.destroy();
  res.json({ message: 'Saison supprimée' });
};
