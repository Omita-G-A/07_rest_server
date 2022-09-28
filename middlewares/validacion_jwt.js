const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validacionJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({   //401 és un status unauthorized
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            })
        }

        // verificar que el uid tiene estado: true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario en estado: false'
            })
        }

        req.usuario = usuario;


        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }


}



module.exports = {
    validacionJWT
}