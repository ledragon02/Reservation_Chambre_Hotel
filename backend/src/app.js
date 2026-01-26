const express = require('express');
const app = express();
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Hotel Reservation fonctionne !');
});

// 🔁 Connexion MySQL avec retry
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à MySQL réussie');
  } catch (err) {
    console.log('MySQL indisponible, nouvelle tentative dans 5s...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
