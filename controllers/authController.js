const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.AutenticarUsuario = async (req,res) => {
    // revisión de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({msg: errores.array()});
    }

    // solicitud de información por body
    const {email, password} = req.body;

    try {
        // verficación de usuario registrado existente
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({ msg: 'Usuario no registrado'});
        }

        // revisión del password
        const correctPass = await bcryptjs.compare(password, usuario.password);
        if(!correctPass){
            return res.status(400).json({ msg: 'Contraseña incorrecta'});
        }
        // si todo se cumple, se firma el token
        const payload = {
            usuario: {id: usuario.id}
        };
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 43200 // aprox. 1h
            },
            (error, token) => {
                if(error) throw error;

                // mensaje de confirmación con token
                res.json({token});
            }
        )
    } catch (error) {
        console.log('Ha sucedido un error (Error general de autenticación)')
        console.log(error);
        res.status(400).send('Ha sucedido un error (Error en status para autenticación)')
    }

};

exports.UsuarioAutenticado = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        res.status(400).json({msg:'Ha sucedido un error al autenticar el usuario'});
    }
}
