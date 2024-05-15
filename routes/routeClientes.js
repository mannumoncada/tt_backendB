const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientesController');

// Rutas del CRUD
router.post('/', clienteController.agregarClientes);
router.get('/', clienteController.mostrarClientes);
router.get('/:id', clienteController.mostrarUnCliente);
router.delete('/:id', clienteController.eliminarClientes);
router.put('/:id', clienteController.actualizarClientes);

module.exports = router;