const express = require('express');
const ConnectDB = require('./config/db');
const cors = require('cors');

// creación del servidor
const app = express();

// configuración del puerto
const PORT = process.env.PORT || 5000;

// conexión con la base de datos
ConnectDB();

// habilitación de cors
app.use(cors());

//habilitación de express json
app.use(express.json({extended:true}));

// creación de rutas para módulos
app.use('/api/usuarios', require('./routes/routeUsuarios'));
app.use('/api/auth', require('./routes/routeAuth'));
app.use('/api/sedes', require ('./routes/routeSedes'));
app.use('/api/clientes', require('./routes/routeClientes'));

// configuración del servidor
app.listen(PORT, () => {
    console.log('Servidor conectado');
});

