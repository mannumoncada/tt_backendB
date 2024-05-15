const mongoose = require('mongoose');
require('dotenv').config({path:'.env'});

const ConnectDB = async () => {
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Está conectado con MongoDB'))
    .catch((err) => console.error(err));
};

module.exports = ConnectDB;