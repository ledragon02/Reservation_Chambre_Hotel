const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambre.controller');

router.get('/', chambreController.getAllChambres);
router.get('/:id', chambreController.getChambreById);
router.post('/', chambreController.createChambre);
router.put('/:id', chambreController.updateChambre);
router.delete('/:id', chambreController.deleteChambre);

module.exports = router;
