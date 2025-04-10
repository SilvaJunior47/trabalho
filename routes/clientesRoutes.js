const express = require('express');
const router = express.Router();

// Controllers
const clienteController = require('../controllers/clienteController');

// Middlewares
const { validateName } = require('../middlewares/nomeMiddleware');
const { validateFamilyName } = require('../middlewares/sobrenomeMiddleware');
const { validateAge } = require('../middlewares/idadeMiddleware');

// Rotas
router.get('/', clienteController.findAll);

router.post(
    '/',
    validateName,
    validateFamilyName,
    validateAge,
    clienteController.save,
);

router.put('/', clienteController.update);

router.delete('/:id', clienteController.remove);

module.exports = router;
