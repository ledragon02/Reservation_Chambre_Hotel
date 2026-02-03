const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Option = sequelize.define('Option', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supplement_prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Option;
