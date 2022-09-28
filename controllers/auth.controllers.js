const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar_jwt");

const login = async (req, res = response) => {


    const { correo, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo / password no es correcto - correo'
            });
        }

        // verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El correo / password no es correcto - estado: false'
            });
        }

        // verificar contraseña
        const passValid = bcryptjs.compareSync( password, usuario.password);
        if (!passValid) {
            return res.status(400).json({
                msg: 'El correo / password no es correcto - password'
            });
        }

        // generar token
        const token = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    login
}