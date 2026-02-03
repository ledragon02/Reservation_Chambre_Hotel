const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReservationService = sequelize.define('ReservationService', {});
module.exports = ReservationService;
