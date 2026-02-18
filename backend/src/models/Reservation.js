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
  nombre_personnes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prix_total: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  statut: {
  type: DataTypes.STRING,
  defaultValue: "en_attente"
},
  statut_paiement: {
  type: DataTypes.STRING,
  defaultValue: "en_attente"
}

});

module.exports = Reservation;
