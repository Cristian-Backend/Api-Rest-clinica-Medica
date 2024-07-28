const Paciente = require('../model/paciente');
const bcryptjs = require('bcrypt');



// obtener paciente por ID
const obtenerPacientePorId = async (req,res= response) => {

    try {
        const { id } = req.params
        const paciente = await Paciente.findById( id )
    
        res.json(paciente)

    } catch (error) {
        console.error('Error al obtener el paciente:', error.message);
        res.status(500).json({ msg: 'Error al obtener el paciente' });
        
    }

}


//Obtener datos de los pacientes

const pacientesGet = async (req, res) => {
    try {
        const pacientes = await Paciente.find({estado: true});
        const contadorPaciente = pacientes.lenght
        res.json({ pacientes , contadorPaciente });
    } catch (error) {
        console.error('Error al obtener los pacientes:', error.message);
        res.status(500).json({ msg: 'Error al obtener los pacientes' });
    }
};


//Crear paciente
const pacientesPost = async (req, res) => {
    try {
        const { nombre, correo,  telefono, estado, historiaClinica, rol , direccion} = req.body;

        

        // Creamos una instancia del modelo Paciente con los datos recibidos
        const paciente = new Paciente({ nombre, correo,   telefono , estado, historiaClinica , rol, direccion});

      
        // Guardamos el paciente en la base de datos
        await paciente.save();

        // Respondemos con un mensaje y el paciente creado
        res.json({
            msg: 'Paciente creado exitosamente',
            paciente
        });
    } catch (error) {
        console.error('Error al crear el paciente:', error.message);
        res.status(500).json({ msg: 'Error al crear el paciente' });
    }
};


//Actualizar paciente
const pacientesPut = async (req, res) => {

const {id} = req.params;
const { _id,  ...resto } = req.body;  // Lo que no se va actualizar


const paciente = await Paciente.findByIdAndUpdate(id, resto, { new: true }); // Lo que quiero que se actualice , y lo actualizado.

res.json({
    msg: 'Paciente actualizado correctamente',
    paciente
})

}


// Eliminar paciente

const pacienteDelete = async (req, res) => {

    const { id } = req.params;

  const paciente =  await Paciente.findByIdAndUpdate(id, {estado:false})

    res.json({
        msg: 'Paciente eliminado correctamente',
        paciente
    })

}

module.exports = {

    pacientesGet,
    obtenerPacientePorId,
    pacientesPost,
    pacientesPut,
    pacienteDelete
};

