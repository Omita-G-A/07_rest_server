const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    // constructor
    constructor() {
        this.app = express(); //crear una app de express como propiedad
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // conectar a la base de datos
        this.connectarDB();
        
        // middlewares
        this.middlewares()

        // rutas
        this.routes();

    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors());

        // lectura y parseo del body
        this.app.use(express.json());
        
        // directorio public
        this.app.use(express.static('public'));
    }


    routes() {
        
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuariosPath, require('../routes/users.routes'));
        

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;