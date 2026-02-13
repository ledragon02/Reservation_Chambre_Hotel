const { Reservation, Chambre, Saison } = require('../models');

exports.getAll = async (req, res) => {
  const reservations = await Reservation.findAll({
    include: [Chambre, Saison]
  });
  res.json(reservations);
};

exports.getOne = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id, {
    include: [Chambre, Saison]
  });

  if (!reservation) {
    return res.status(404).json({ error: 'Reservation non trouvée' });
  }

  res.json(reservation);
};

exports.create = async (req, res) => {
  try {
    const { date_debut, date_fin, nombre_personnes, ChambreId, SaisonId } = req.body;

    const chambre = await Chambre.findByPk(ChambreId);
    const saison = await Saison.findByPk(SaisonId);

    if (!chambre || !saison) {
      return res.status(404).json({ error: 'Chambre ou Saison non trouvée' });
    }

    // Calcul nombre de nuits
    const start = new Date(date_debut);
    const end = new Date(date_fin);
    const diffTime = Math.abs(end - start);
    const nombre_nuits = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calcul prix
    const prix_total =
      chambre.prix_base *
      saison.multiplicateur_prix *
      nombre_nuits;

    const reservation = await Reservation.create({
      date_debut,
      date_fin,
      nombre_personnes,
      ChambreId,
      SaisonId,
      prix_total
    });

    res.status(201).json(reservation);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.update = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation non trouvée' });
  }

  await reservation.update(req.body);
  res.json(reservation);
};

exports.remove = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation non trouvée' });
  }

  await reservation.destroy();
  res.json({ message: 'Reservation supprimée' });
};
