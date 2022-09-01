const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario( { nombre, correo, password, role } );

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    // guardar en db
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // validar ante db
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt);    
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
}
const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // eliminar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    res.json({
        usuario
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}