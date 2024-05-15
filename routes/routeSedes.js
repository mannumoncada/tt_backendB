const express = require('express');
const router = express.Router();
const sedesController = require ('../controllers/sedesController');

// Rutas del CRUD
router.post('/', sedesController.agregarSedes);
router.get('/', sedesController.mostrarSedes);
router.get('/:id', sedesController.mostrarUnaSede);
router.delete('/:id', sedesController.eliminarSedes);
router.put('/:id', sedesController.actualizarSedes);

module.exports = router;