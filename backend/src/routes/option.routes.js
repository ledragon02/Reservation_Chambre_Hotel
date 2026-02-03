const express = require('express');
const router = express.Router();
const optionController = require('../controllers/option.controller');

router.get('/', optionController.getAll);
router.get('/:id', optionController.getOne);
router.post('/', optionController.create);
router.put('/:id', optionController.update);
router.delete('/:id', optionController.remove);

module.exports = router;
