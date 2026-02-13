const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationService.controller');

router.post('/reservations/:reservationId/services/:serviceId', controller.addService);
router.delete('/reservations/:reservationId/services/:serviceId', controller.removeService);
router.get('/reservations/:reservationId/services', controller.getServices);

module.exports = router;
