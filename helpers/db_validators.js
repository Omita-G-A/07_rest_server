const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error('El rol no es válido')
    }
}

// verificar si el correo existe
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('Este correo ya está registrado')
    }
}

// verificar usuario por id
const existeUsuarioPorId = async (_id) => {
    const existeUsuario = await Usuario.findById({ _id });
    if (!existeUsuario) {
        throw new Error('Este id no existe')
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}