const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const { validateName } = require('../middlewares/nomeMiddleware');
const { validateFamilyName } = require('../middlewares/sobrenomeMiddleware');
const { validateAge } = require('../middlewares/idadeMiddleware');

router.get('/', clientesController.findAll);

router.post(
  '/',
  validateName,
  validateFamilyName,
  validateAge,
  clientesController.save
);

router.put('/', clientesController.update);
router.delete('/:id', clientesController.remove);

module.exports = router;
