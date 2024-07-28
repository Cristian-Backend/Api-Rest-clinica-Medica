const { Schema, model } = require('mongoose');


const TratamientoSchema = Schema({
    paciente_id: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El ID del paciente es obligatorio']
    },
  descripcion: {
        type: String,
        required: [true, 'La descripción del tratamiento es obligatoria']
    },
    start_date: {
        type: Date,
        required: [true, 'La fecha de inicio del tratamiento es obligatoria']
    },
    end_date: {
        type: Date,
        required: [true, 'La fecha de fin del tratamiento es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

// Exportar el modelo
module.exports = model('Tratamiento', TratamientoSchema);