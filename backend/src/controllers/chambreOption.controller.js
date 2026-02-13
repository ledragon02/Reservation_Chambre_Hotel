const { Chambre, Option } = require('../models');

// Ajouter une option à une chambre
exports.addOptionToChambre = async (req, res) => {
  const { chambreId, optionId } = req.params;

  const chambre = await Chambre.findByPk(chambreId);
  const option = await Option.findByPk(optionId);

  if (!chambre || !option) {
    return res.status(404).json({ error: 'Chambre ou option introuvable' });
  }

  await chambre.addOption(option);
  res.json({ message: 'Option ajoutée à la chambre' });
};

// Supprimer une option d’une chambre
exports.removeOptionFromChambre = async (req, res) => {
  const { chambreId, optionId } = req.params;

  const chambre = await Chambre.findByPk(chambreId);
  const option = await Option.findByPk(optionId);

  if (!chambre || !option) {
    return res.status(404).json({ error: 'Chambre ou option introuvable' });
  }

  await chambre.removeOption(option);
  res.json({ message: 'Option retirée de la chambre' });
};

// Lister les options d’une chambre
exports.getOptionsByChambre = async (req, res) => {
  const chambre = await Chambre.findByPk(req.params.chambreId, {
    include: Option
  });

  if (!chambre) {
    return res.status(404).json({ error: 'Chambre introuvable' });
  }

  res.json(chambre.Options);
};
