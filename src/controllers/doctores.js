const Doctor = require('../model/doctor')
const bcryptjs = require('bcrypt')


// obtener doctor por ID
const obtenerDoctorPorId = async (req,res= response) => {

    try {
        const { id } = req.params
        const doctor = await Doctor.findById( id )
    
        res.json(doctor)

    } catch (error) {
        console.error('Error al obtener el doctor:', error.message);
        res.status(500).json({ msg: 'Error al obtener el doctor' });
        
    }

}


//Obtener datos de los doctores

const doctoresGet = async (req, res) => {
    try {
        const doctores = await Doctor.find();
        const contadorDoctores = doctores.lenght
        res.json({ doctores , contadorDoctores});
    } catch (error) {
        console.error('Error al obtener los doctores:', error.message);
        res.status(500).json({ msg: 'Error al obtener los doctores' });
    }
};


//Crear doctor
const doctoresPost = async (req, res) => {
    try {
        const { nombre, correo, telefono, estado, password, rol, especialidad} = req.body;

        // Creamos una instancia del modelo Paciente con los datos recibidos
        const doctor = new Doctor({ nombre, correo, telefono , estado, password, rol, especialidad });

        // encriptacion de contraseña
    const salt = bcryptjs.genSaltSync(); // numero de vueltas por defecto es 10
    doctor.password = bcryptjs.hashSync( password, salt );

      
        // Guardamos el paciente en la base de datos
        await doctor.save();

        // Respondemos con un mensaje y el paciente creado
        res.json({
            msg: 'Doctor creado exitosamente',
            doctor
        });
    } catch (error) {
        console.error('Error al crear el doctor:', error.message);
        res.status(500).json({ msg: 'Error al crear el doctor' });
    }
};


//Actualizar doctor
const doctoresPut = async (req, res) => {

const {id} = req.params;
const { _id, estado, password,  ...resto } = req.body;  // Lo que no se va a ctualizar


const doctor = await Doctor.findByIdAndUpdate(id, resto, { new: true }); // Lo que quiero que se actualice , y lo actualizado.

res.json({
    msg: 'Doctor actualizado correctamente',
   doctor
})

}


// Eliminar doctor

const doctorDelete = async (req, res) => {

    const { id } = req.params;

    const  doctor = await Doctor.findByIdAndUpdate(id, {estado:false}) // pone en la base de datos el estado en false.

    res.json({
        msg: 'Doctor eliminado correctamente',
        doctor
    })

}

module.exports = {
obtenerDoctorPorId,
doctoresGet,
doctoresPost,
doctoresPut,
doctorDelete
   
};