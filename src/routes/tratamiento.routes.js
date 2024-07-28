const { Router } = require('express');
const { check } = require('express-validator');

const validarCampos = require('../middlewares/validarCampos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { obtenerTratamientoPorId, obtenerTratamientos, crearTratamiento, actualizarTratamiento, eliminarTratamiento } = require('../controllers/tratamiento');
const { existePacientePorID, esFechaValida, validarFechasDeTratamiento } = require('../middlewares/validacionesBD');

const router = Router();


router.get('/tratamientos/:id', [
    validarJWT,
    check('id', 'No es un ID válido de MongoDB').isMongoId(),
],obtenerTratamientoPorId)

router.get('/tratamientos', [
    validarJWT,
    esAdminRole
],obtenerTratamientos)



router.post('/tratamientos', [

    check('paciente_id', 'El ID del paciente es obligatorio').not().isEmpty(),
    check('paciente_id', 'no es un mongoID valido').isMongoId(),
    check('paciente_id').custom(existePacientePorID),
    
    check('descripcion', 'la descripcion es obligatoria').not().isEmpty(),
    
    check('start_date', 'la fecha de inicio del tratamiento es obligatoria').not().isEmpty(),
    check('start_date').custom(esFechaValida),
    check('end_date', 'la fecha en donde se finalizo el tratamiento es obligatorio').notEmpty(),
    check('end_date').custom(validarFechasDeTratamiento),
    validarCampos
],crearTratamiento)


router.put('/tratamientos/:id', [
validarJWT,
check('paciente_id', 'no es un mongoID valido').isMongoId(),



validarCampos
],actualizarTratamiento)

router.delete('/tratamientos/:id', [
    validarJWT,
    esAdminRole,

check('id', 'no es un mongo ID').isMongoId(),

    validarCampos
],eliminarTratamiento)



module.exports = router;