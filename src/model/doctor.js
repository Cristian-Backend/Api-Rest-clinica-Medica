const { model, Schema } = require('mongoose');

const doctorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true 
    },

     password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'] 
    },

    telefono: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // SOLO ESTOS 2 ROLES se podrian elegir.
    },

    estado: { // en el estado veo si se borro de la base de datos.
        type: Boolean,
        default: true
    },
    especialidad: {
        type: String,
        required: true
    }
});

// Ocultar __v y estado al convertir a JSON
doctorSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...doctor } = this.toObject();
    doctor.uid = _id;  // Aquí se asigna _id correctamente
    return doctor;
};

module.exports = model('Doctor', doctorSchema);
