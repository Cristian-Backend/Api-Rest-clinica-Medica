const { Schema, model } = require('mongoose');

const citaSchema = Schema({
    paciente_id: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El ID del paciente es obligatorio']
    },
    doctor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'El ID del doctor es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha de la cita es obligatoria']
    },
    razon: {
        type: String,
        required: [true, 'El motivo de la cita es obligatorio']
    },
    estadoCita: {
        type: String,
        enum: ['programado', 'completado', 'cancelado'],
        default: 'programado'
    },
    notas: {
        type: String
    }
});

module.exports = model('Cita', citaSchema);