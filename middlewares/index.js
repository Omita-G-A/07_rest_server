const validarCampos = require('../middlewares/validacion_campos');
const validacionJWT = require('../middlewares/validacion_jwt');
const validacionRoles = require('../middlewares/validacion_roles');


module.exports = {
    ...validarCampos,
    ...validacionJWT,
    ...validacionRoles
}