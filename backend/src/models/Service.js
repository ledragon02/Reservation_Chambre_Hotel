const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  par_nuit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Service;
