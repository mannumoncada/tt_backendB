const Cliente = require('../models/Cliente');

// función para agregar clientes (agregarClientes)
exports.agregarClientes = async(req, res) => {
    try {
        let clientes = new Cliente(req.body);
        await clientes.save();
        res.send(clientes);

    } catch(error) {
        console.log(error)
        res.status(500).send('Se ha encontrado un error al agregar el cliente')
    }
}

// función para mostrar clientes
exports.mostrarClientes = async(req, res) => {
    try {
        let clientes = await Cliente.find();
        res.json({clientes});

    } catch (error) {
        console.log(error)
        res.status(500).send('Se ha encontrado un error al mostrar el cliente')
    }
    }

// función para mostrar un solo cliente
exports.mostrarUnCliente = async (req, res) => {
    try {
        let clientes = await Cliente.findById(req.params.id);
        // validación de que se encuentre el cliente
        if(!clientes){
            res.status(404).json({msg: 'El cliente con ese ID no se encuentra'})
        }

        res.send(clientes);
        
    } catch (error) {
        // sucede en caso que no se pueda conectar con el servidor o haya un problema en la web
        console.log(error);
        res.status(500).send('Error al buscar el cliente en la base de datos');
    }
}

// función para eliminar clientes
exports.eliminarClientes = async (req, res) => {
    try {
        let clientes = await Cliente.findById(req.params.id);
       // validación de que el cliente a ser eliminado exista en la BD
        if(!clientes) {
            res.status(404).json({msg: 'El cliente no existe'});
            return // para evitar que cause errores al terminar la consulta
        }
        await Cliente.findOneAndDelete ({_id: req.params.id});
        res.json({msg: 'El cliente ha sido eliminado exitosamente'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el cliente en la base de datos');
    }
}

// función para actualizar clientes
exports.actualizarClientes = async(req, res) => {
    try {
        let cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true});
    if(!cliente){
        return res.status(404).send('Cliente no encontrado');
    }
    res.json(cliente)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al modificar el cliente en la base de datos');
    }
}
