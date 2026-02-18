const sequelize = require('../config/database');

// Import des modèles ( respecter exactement les noms de fichiers)
const Chambre = require('./Chambre');
const Option = require('./Option');
const Service = require('./Service');
const Reservation = require('./Reservation');
const Saison = require('./Saison');
const ChambreOption = require('./ChambreOption');
const ReservationService = require('./ReservationService');
const User = require('./user');

// Relations
Chambre.belongsToMany(Option, { through: ChambreOption });
Option.belongsToMany(Chambre, { through: ChambreOption });

Reservation.belongsToMany(Service, { through: ReservationService });
Service.belongsToMany(Reservation, { through: ReservationService });

User.hasMany(Reservation);
Reservation.belongsTo(User);

Chambre.hasMany(Reservation);
Reservation.belongsTo(Chambre);

Saison.hasMany(Reservation);
Reservation.belongsTo(Saison);


module.exports = {
  sequelize,
  Chambre,
  User,
  Option,
  Service,
  Reservation,
  Saison
};
