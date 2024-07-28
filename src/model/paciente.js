const { model, Schema } = require('mongoose');

const pacienteSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true 
    },

    telefono: {
        type: String,
        required: true,

    },
    
    direccion: {
        type: String,
        required: true,
       
    },

    estado:{ // en el estado veo si se borro de la base de datos.
        type:Boolean ,
        default: true
    },

    rol:{
        type: String,
        required: true,
        emun: ['USER_ROLE'] // SOLO ESTOS 2 ROLES se podrian elegir.
    },

    historiaClinica: {
        type: String,
        required: true,
        minlength: 10
    },

  
});

// Ocultar password y __v al convertir a JSON
pacienteSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...paciente } = this.toObject();
    paciente.uid = _id;
    return paciente;
};

module.exports = model('Paciente', pacienteSchema);
