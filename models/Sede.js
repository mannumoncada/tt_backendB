const mongoose = require('mongoose');

// El modelo a realizar debe ser igual a lo que tenga la BD
const SedesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    zona: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    capacidad: {
        type: Number,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        required: true,
    }
}, {versionkey: false});

module.exports = mongoose.model('Sedes', SedesSchema);