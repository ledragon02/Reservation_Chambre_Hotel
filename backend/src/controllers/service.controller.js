const { Service } = require('../models');

exports.getAll = async (req, res) => {
  const services = await Service.findAll();
  res.json(services);
};

exports.getOne = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service non trouvé' });
  }
  res.json(service);
};

exports.create = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service non trouvé' });
  }

  await service.update(req.body);
  res.json(service);
};

exports.remove = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service non trouvé' });
  }

  await service.destroy();
  res.json({ message: 'Service supprimé' });
};
