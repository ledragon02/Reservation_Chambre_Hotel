const express = require('express');
const router = express.Router();
const controller = require('../controllers/chambreOption.controller');

// Ajouter option à chambre
router.post('/chambres/:chambreId/options/:optionId', controller.addOptionToChambre);

// Supprimer option d’une chambre
router.delete('/chambres/:chambreId/options/:optionId', controller.removeOptionFromChambre);

// Lister options d’une chambre
router.get('/chambres/:chambreId/options', controller.getOptionsByChambre);

module.exports = router;
