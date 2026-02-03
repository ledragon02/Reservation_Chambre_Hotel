const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  prix_total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Reservation;
