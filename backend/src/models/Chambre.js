const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chambre = sequelize.define('Chambre', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prix_base: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  capacite: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'chambres'
});

module.exports = Chambre;
