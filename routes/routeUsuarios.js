const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usuariosController = require('../controllers/usuariosController');

// creación de un usuario (usar ruta api/usuarios)
router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener 8 cáracters').isLength({
            min: 8
        }),
    ],
    usuariosController.CrearUsuario
);

module.exports = router;
