const { Option } = require('../models');

exports.getAll = async (req, res) => {
  const options = await Option.findAll();
  res.json(options);
};

exports.getOne = async (req, res) => {
  const option = await Option.findByPk(req.params.id);
  if (!option) {
    return res.status(404).json({ error: 'Option non trouvée' });
  }
  res.json(option);
};

exports.create = async (req, res) => {
  try {
    const option = await Option.create(req.body);
    res.status(201).json(option);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const option = await Option.findByPk(req.params.id);
  if (!option) {
    return res.status(404).json({ error: 'Option non trouvée' });
  }

  await option.update(req.body);
  res.json(option);
};

exports.remove = async (req, res) => {
  const option = await Option.findByPk(req.params.id);
  if (!option) {
    return res.status(404).json({ error: 'Option non trouvée' });
  }

  await option.destroy();
  res.json({ message: 'Option supprimée' });
};
