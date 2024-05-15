const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// para autenticar un usuario (usar ruta 'api/auth')
router.post(
    '/', [
        check('email', 'Inserte un email').isEmail(),
        check('password', 'Inserte una contraseña de 8 cáracteres').isLength({
            min: 8
        }),
    ],
    authController.AutenticarUsuario
);

router.get(
    '/', auth, authController.UsuarioAutenticado);

    module.exports = router;
