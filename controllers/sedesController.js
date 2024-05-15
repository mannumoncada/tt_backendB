const Sede = require('../models/Sede');

// función de agregar sedes
exports.agregarSedes = async(req, res) => {
    try {
        let sedes = new Sede(req.body);
        await sedes.save();
        res.send(sedes);

    } catch(error) {
        console.log(error)
        res.status(500).send('Hubo un error al agregar la sede')
    }
}

// función para mostrar las sedes
exports.mostrarSedes = async(req, res) => {
    try {
        let sedes = await Sede.find();
        res.json({sedes});

    } catch (error) {
        console.log(error)
        res.status(500).send('Se ha encontrado un error al mostrar el cliente')
    }
    }

// función para mostrar una sola sede
exports.mostrarUnaSede = async (req, res) => {
    try {
        let sedes = await Sede.findById(req.params.id);
        // validación de que se encuentre la sede
        if(!sedes){
            res.status(404).json({msg: 'La sede con ese ID no ha encontrado'})
        }

        res.send(sedes);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar la sede en la base de datos');
    }
}

// función para eliminar una sede
exports.eliminarSedes = async (req, res) => {
    try {
        let sedes = await Sede.findById(req.params.id);
       // validación de que el cliente a ser eliminado exista en la BD
        if(!sedes) {
            res.status(404).json({msg: 'La sede no existe'});
            return // para evitar que cause errores al terminar la consulta
        }
        await Sede.findOneAndDelete ({_id: req.params.id});
        res.json({msg: 'La sede ha sido eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar la sede en la base de datos');
    }
}

// función para actualizar las sedes
exports.actualizarSedes = async(req, res) => {
    try {
        let sedes = await Sede.findByIdAndUpdate(req.params.id, req.body, { new: true});
    if(!sedes){
        return res.status(404).send('Sede no encontrada');
    }
    res.json(sedes)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al modificar la sede en la base de datos');
    }
}
