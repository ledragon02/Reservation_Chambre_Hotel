const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservation.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.put("/:id/confirmer", controller.confirmer);
router.put("/:id/annuler", controller.annuler);


module.exports = router;
