const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChambreOption = sequelize.define('ChambreOption', {});
module.exports = ChambreOption;
