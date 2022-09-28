const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validacion_campos');

const router = Router();


router.post('/login',[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );



module.exports = router;