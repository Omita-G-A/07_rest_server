const { response } = require('express');


const esAdminRole = ( req, res = response, next ) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin tener primero token.'
        });
    }

    const { role, nombre } = req.usuario;

    if ( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: ` ${nombre} no es administrador - no puede realizar esta acción`
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {
    return ( req, res = response, next ) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar rol sin tener primero token.'
            });
        }

        if ( !roles.includes(req.usuario.role) ) {
            return res.status(401).json({
                msg: `Esta acción requiere uno de estos roles: ${roles}`
            });
        }
        
        next()
    }
};

module.exports = {
    esAdminRole,
    tieneRole
};