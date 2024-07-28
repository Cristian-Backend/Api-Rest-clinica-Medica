const express = require('express')

const {check} = require('express-validator')

const { obtenerDoctorPorId, doctoresPost, doctoresGet, doctoresPut, doctorDelete } = require('../controllers/doctores')
const validarCampos = require('../middlewares/validarCampos')
const { existeDoctorPorID, emailValido, RoleValido } = require('../middlewares/validacionesBD')
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')
const { validarJWT } = require('../middlewares/validar-jwt')



const router = express.Router()

//validaciones 

router.get('/doctores/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom ( existeDoctorPorID),
    validarCampos
],obtenerDoctorPorId)

router.get('/doctores', doctoresGet)

router.post('/doctores', [
    validarJWT,
check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailValido),
    check('password', 'La contraseña debe tener al menos 6 letras').isLength({min:6}),
    check('telefono', 'El telefono debe tener al menos 9 numeros').isLength({min:9}),
    check('rol').custom( RoleValido),
    validarCampos
],doctoresPost)

router.put('/doctores/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(), //Usuario de mongoID
    check('id').custom ( existeDoctorPorID ),
    check('rol').custom( RoleValido),
    validarCampos
],doctoresPut)

router.delete('/doctores/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(), //Usuario de mongoID 
    check('id').custom ( existeDoctorPorID ),
], doctorDelete)





module.exports = router;