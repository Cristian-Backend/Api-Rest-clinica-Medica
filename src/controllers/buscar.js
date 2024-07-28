const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Doctor = require('../model/doctor');
const Paciente = require('../model/paciente');
const Cita = require('../model/citas');

const coleccionesPermitidas = [
    'doctores',
    'pacientes',
    'citas',
    'roles'
];

// Buscar doctores por ID o término
const buscarDoctores = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const doctor = await Doctor.findById(termino);
        return res.json({
            results: (doctor) ? [doctor] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const doctores = await Doctor.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: doctores
    });
};

// Buscar pacientes por ID o término
const buscarPacientes = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const paciente = await Paciente.findById(termino);
        return res.json({
            results: (paciente) ? [paciente] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const pacientes = await Paciente.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: pacientes
    });
};

// Buscar citas por ID o término
const buscarCitas = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const cita = await Cita.findById(termino)
            .populate('doctor', 'nombre');
        return res.json({
            results: (cita) ? [cita] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const citas = await Cita.find({ nombre: regex, estado: true })
        .populate('doctor', 'nombre');

    res.json({
        results: citas
    });
};

// Buscar en colecciones permitidas
const buscar = (req, res = response) => {
    const { entidad, termino } = req.params;

    if (!coleccionesPermitidas.includes(entidad)){ // si no incluye las colecciones permitidas , entonces..
        return res.status(400).json(`Las colecciones permitidas son ${coleccionesPermitidas}`)
    } 

    switch (entidad) {
        case 'doctores':
            buscarDoctores(termino, res);
            break;
        case 'pacientes':
            buscarPacientes(termino, res);
            break;
        case 'citas':
            buscarCitas(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se olvidó hacer esta búsqueda'
            });
    }
};

module.exports = {
    buscar
};
