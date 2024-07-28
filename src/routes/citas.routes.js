const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');
const { esFechaValida, existePacientePorID, existeDoctorPorID } = require('../middlewares/validacionesBD');
const { obtenerCitas, crearCita, actualizarCita, eliminarCita, obtenerCitaPorId } = require('../controllers/citas');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();


router.get('/citas/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(), //Usuario de mongoID
],obtenerCitaPorId)

router.get('/citas', obtenerCitas) 

router.post('/citas',[
    validarJWT,
    check('paciente_id', 'El ID del paciente es obligatorio').not().isEmpty(),
    check('paciente_id', 'no es un mongoID valido').isMongoId(),
    check('paciente_id').custom(existePacientePorID),

    check('doctor_id', 'el id del doctor es obligatorio').not().isEmpty(),
    check('doctor_id', 'No es un mongoID valido').isMongoId(),
    check('doctor_id').custom(existeDoctorPorID),

    check('fecha', 'la fecha de la cita es obligatoria').not().isEmpty(),
    check('fecha').custom(esFechaValida),

    check('razon', 'el motivo cita es obligatoria').not().isEmpty(),


  validarCampos
], crearCita)

router.put('/citas/:id',[
    validarJWT,
    check('paciente_id', 'El ID del paciente es obligatorio').optional().isMongoId().custom(existePacientePorID),
    check('doctor_id', 'El ID del doctor es obligatorio').optional().isMongoId().custom(existeDoctorPorID),
    check('fecha', 'La fecha de la cita no es válida').optional().custom(esFechaValida),
    check('razon', 'El motivo de la cita es obligatorio').optional().not().isEmpty(),
    validarCampos
], actualizarCita)

router.delete('/citas/:id', [
    validarJWT,
    esAdminRole,
        check('id', 'El ID de la cita no es válido').isMongoId(),
        validarCampos
    ],eliminarCita)


module.exports = router;