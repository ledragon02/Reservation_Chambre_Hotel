const { Op } = require('sequelize');
const { Reservation, Chambre, Saison, Service, Option, User } = require('../models');

exports.getAll = async (req, res) => {
  try {

    let whereCondition = {};

    // Si client → voir seulement ses réservations
    if (req.user.role === "client") {
      whereCondition.UserId = req.user.id;
    }

    const reservations = await Reservation.findAll({
      where: whereCondition,
      include: [
        {
          model: Chambre,
          include: [Option]
        },
        Saison,
        Service,
        User
      ]
    });

    res.json(reservations);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getOne = async (req, res) => {
  try {

    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        {
          model: Chambre,
          include: [Option]
        },
        Saison,
        Service,
        User
      ]
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation non trouvée' });
    }

    res.json(reservation);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.create = async (req, res) => {
  try {

    const {
      date_debut,
      date_fin,
      nombre_personnes,
      ChambreId,
      SaisonId,
      servicesIds
    } = req.body;

    // On récupère l'utilisateur depuis le token
    const userId = req.user.id;

    const chambre = await Chambre.findByPk(ChambreId, {
      include: Option
    });

    const saison = await Saison.findByPk(SaisonId);

    if (!chambre || !saison) {
      return res.status(404).json({ error: 'Chambre ou Saison non trouvée' });
    }

    // Vérifier disponibilité chambre
    const reservationExistante = await Reservation.findOne({
      where: {
        ChambreId,
        date_debut: { [Op.lt]: date_fin },
        date_fin: { [Op.gt]: date_debut }
      }
    });

    if (reservationExistante) {
      return res.status(400).json({
        error: "Cette chambre est déjà réservée sur ces dates"
      });
    }

    // Calcul nombre de nuits
    const start = new Date(date_debut);
    const end = new Date(date_fin);
    const diffTime = Math.abs(end - start);
    const nombre_nuits = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Base chambre × saison × nuits
    let prix_total =
      chambre.prix_base *
      saison.multiplicateur_prix *
      nombre_nuits;

    // Ajouter options de la chambre
    if (chambre.Options) {
      chambre.Options.forEach(option => {
        prix_total += option.supplement_prix;
      });
    }

    // Ajouter services si fournis
    let services = [];
    if (servicesIds && servicesIds.length > 0) {
      services = await Service.findAll({
        where: { id: servicesIds }
      });

      services.forEach(service => {
        prix_total += service.prix;
      });
    }

    const reservation = await Reservation.create({
      date_debut,
      date_fin,
      nombre_personnes,
      ChambreId,
      SaisonId,
      prix_total,
      UserId: userId   // 🔥 sécurisé via JWT
    });

    if (services.length > 0) {
      await reservation.addServices(services);
    }

    res.status(201).json(reservation);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.update = async (req, res) => {
  try {

    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation non trouvée' });
    }

    if (reservation.statut === "confirmée") {
      return res.status(400).json({
        error: "Impossible de modifier une réservation confirmée"
      });
    }

    const { date_debut, date_fin, ChambreId } = req.body;

    if (date_debut && date_fin && ChambreId) {

      const reservationExistante = await Reservation.findOne({
        where: {
          id: { [Op.ne]: reservation.id },
          ChambreId,
          date_debut: { [Op.lt]: date_fin },
          date_fin: { [Op.gt]: date_debut }
        }
      });

      if (reservationExistante) {
        return res.status(400).json({
          error: "Cette chambre est déjà réservée sur ces dates"
        });
      }
    }

    await reservation.update(req.body);

    res.json(reservation);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.confirmer = async (req, res) => {
  try {

    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation non trouvée" });
    }

    if (reservation.statut === "annulée") {
      return res.status(400).json({ error: "Impossible de confirmer une réservation annulée" });
    }
    if (reservation.statut_paiement !== "payé") {
  return res.status(400).json({
    error: "Impossible de confirmer une réservation non payée"
  });
}

    await reservation.update({ statut: "confirmée" });

    res.json(reservation);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.annuler = async (req, res) => {
  try {

    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation non trouvée" });
    }

    if (reservation.statut === "confirmée") {
      return res.status(400).json({ error: "Impossible d’annuler une réservation confirmée" });
    }

    await reservation.update({ statut: "annulée" });

    res.json(reservation);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.payer = async (req, res) => {
  try {

    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation non trouvée" });
    }

    if (reservation.statut_paiement === "payé") {
      return res.status(400).json({ error: "Déjà payé" });
    }

    // Simulation paiement réussi
    await reservation.update({ statut_paiement: "payé" });

    res.json({
      message: "Paiement effectué avec succès",
      reservation
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {

    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation non trouvée' });
    }

    await reservation.destroy();

    res.json({ message: 'Reservation supprimée' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
