const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.CrearUsuario = async (req,res) => {
    // revisión de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({msg: errores.array()});
    }

    // solicitud de información por body
    const {email, password} = req.body;

    try {
        // verficación de que el usuario registrado sea único
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({ msg: 'Este usuario ya existe'});
        }

        // creación del usuario nuevo
        usuario = new Usuario(req.body);
        usuario.password = await bcryptjs.hash(password, 8);

        // se guarda el nuevo usuario
        await usuario.save();

        // si todo se cumple, se firma el token
        const payload = {
            usuario: {id: usuario.id}
        };
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600
            },
            (error, token) => {
                if(error) throw error;

                // mensaje de confirmación con token
                res.json({token});
            }
        )
    } catch (error) {
        console.log('Ha sucedido un error (Error general de creación de usuario)')
        console.log(error);
        res.status(400).send('Ha sucedido un error (Error en status de creación de usuario)')
    }
}