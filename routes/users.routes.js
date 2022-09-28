const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/user.controllers');

const { validarCampos,
    validacionJWT,
    tieneRole } = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db_validators');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    // check('role', 'Este no es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validacionJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);


module.exports = router;