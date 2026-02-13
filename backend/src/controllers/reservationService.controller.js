const { Reservation, Service } = require('../models');

// Ajouter un service à une réservation
exports.addService = async (req, res) => {
  const { reservationId, serviceId } = req.params;

  const reservation = await Reservation.findByPk(reservationId);
  const service = await Service.findByPk(serviceId);

  if (!reservation || !service) {
    return res.status(404).json({ error: 'Reservation ou Service non trouvé' });
  }

  await reservation.addService(service);

  res.json({ message: 'Service ajouté à la réservation' });
};

// Retirer un service
exports.removeService = async (req, res) => {
  const { reservationId, serviceId } = req.params;

  const reservation = await Reservation.findByPk(reservationId);
  const service = await Service.findByPk(serviceId);

  if (!reservation || !service) {
    return res.status(404).json({ error: 'Reservation ou Service non trouvé' });
  }

  await reservation.removeService(service);

  res.json({ message: 'Service retiré de la réservation' });
};

// Lister les services d'une réservation
exports.getServices = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.reservationId, {
    include: Service
  });

  if (!reservation) {
    return res.status(404).json({ error: 'Reservation non trouvée' });
  }

  res.json(reservation.Services);
};
