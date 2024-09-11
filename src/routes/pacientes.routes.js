const express = require('express')

const {check} = require('express-validator')

const {pacientesPost, pacientesGet, obtenerPacientePorId, pacientesPut,pacienteDelete} = require('../controllers/pacientes')
const validarCampos = require('../middlewares/validarCampos')
const {emailValido,  existePacientePorID, RoleValido} = require('../middlewares/validacionesBD')
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = express.Router()
router.get('/inicio', (req,res)=> {
res.send('Inicio ')
})

router.get('/pacientes/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(), //Usuario de mongoID 
    check('id'). custom ( existePacientePorID),
    validarCampos,
],obtenerPacientePorId)




router.get('/pacientes', [
    validarJWT,
    esAdminRole,
    validarCampos,
],pacientesGet)


router.post('/pacientes', [
   validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailValido),
    check('telefono', 'el telefono debe tener al menos 6 numeros').isLength({min:6}),
    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
    check('rol').custom( RoleValido),
    validarCampos
]  ,pacientesPost)


router.put('/pacientes/:id',[ 
    validarJWT,
    check('id', 'No es un id valido').isMongoId(), //Usuario de mongoID 
    check('id'). custom ( existePacientePorID ),
    check('rol').custom( RoleValido),
    validarCampos
],   pacientesPut)


router.delete('/pacientes/:id', [ 
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existePacientePorID ),
    validarCampos,
],pacienteDelete)




module.exports = router;