const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    // lectura del token (header)
    const token = req.header("x-auth.token")
    // revisión de token existente
    if(!token){
        return res.status(400).json({msg:'Permiso denegado, no tiene un token'});
    }
// validación del token
try {
    const cipher = jwt.verify(token.process.env.SECRETA)
    req.usuario = cipher.usuario;
    next();
} catch (error) {
    res.status(400).json({msg: 'Token inválido'})
}
};