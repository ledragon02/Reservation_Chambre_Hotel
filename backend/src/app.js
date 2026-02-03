const express = require('express');
const app = express();
const sequelize = require('./config/database');
const chambreRoutes = require('./routes/chambre.routes');
const optionRoutes = require('./routes/option.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/chambres', chambreRoutes);
app.use('/options', optionRoutes);

app.get('/', (req, res) => {
  res.send('API Hotel Reservation fonctionne !');
});

// IMPORTANT : charger les modèles AVANT sync
require('./models');

// Connexion MySQL avec retry
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à MySQL réussie');

    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée');
  } catch (err) {
    console.log('MySQL indisponible, nouvelle tentative dans 5s...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
