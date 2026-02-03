const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Saison = sequelize.define('Saison', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  multiplicateur_prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Saison;
