const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservation.controller');
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

//  Toutes les routes nécessitent un token
router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getOne);
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.remove);

//  Seulement admin peut confirmer/annuler
router.put("/:id/confirmer", verifyToken, isAdmin, controller.confirmer);
router.put("/:id/annuler", verifyToken, isAdmin, controller.annuler);
router.put("/:id/payer", verifyToken, controller.payer);

module.exports = router;
