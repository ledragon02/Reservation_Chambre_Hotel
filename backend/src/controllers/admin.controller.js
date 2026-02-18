const { Reservation } = require("../models");
const { Op } = require("sequelize");

exports.getStats = async (req, res) => {
  try {

    const totalReservations = await Reservation.count();

    const confirmedReservations = await Reservation.count({
      where: { statut: "confirmée" }
    });

    const cancelledReservations = await Reservation.count({
      where: { statut: "annulée" }
    });

    const totalRevenue = await Reservation.sum("prix_total");

    res.json({
      totalReservations,
      confirmedReservations,
      cancelledReservations,
      totalRevenue: totalRevenue || 0
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
