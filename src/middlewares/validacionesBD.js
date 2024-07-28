const Role = require('../model/role')
const Paciente = require('../model/paciente')
const Usuario = require('../model/usuario')
const Doctor = require('../model/doctor')
const Cita = require('../model/citas')


const emailValido = async(correo = '')=> {

    const EmailExiste = await Paciente.findOne({correo})

        if(EmailExiste){
            throw new Error (`el correo ${correo} ya esta registrrado en la Base de datos`)
        }

    }

// role si existe en base de datos.
const RoleValido = async (rol = '') => {
    const RolExiste = await Role.findOne({ rol })
    if (!RolExiste) { 
        throw new Error(`Este rol no existe en la Base de datos`)
    }
}


    //Verificamos si existe el Usuario por ese  ID
    const existePacientePorID = async(id)=> {
      
        const usuarioExiste = await Paciente.findById(id) // traemos al usuario por ID
        if (!usuarioExiste){
           throw new Error (`el id  ${id} no existe ` )
            }
        }

        //doctor por ID
        const existeDoctorPorID = async(id)=> {
      
            const doctorExiste = await Doctor.findById(id) // traemos al usuario por ID
            if (!doctorExiste){
               throw new Error (`el id  ${id} no existe ` )
                }
            }

           //Usuario por ID
           const existeUsuarioPorID = async(id)=> {
      
            const usuarioExiste = await Usuario.findById(id) // traemos al usuario por ID
            if (!usuarioExiste){
               throw new Error (`el id  ${id} no existe ` )
                }
            }


            //Fecha valida para las citas.
            const esFechaValida = async (date) => {
                const fecha = new Date(date);
                const ahora = new Date();
                if (isNaN(fecha.getTime()) || fecha <= ahora) {
                    throw new Error('La fecha de la cita no es válida o está en el pasado');
                }
                return true;
            };
            

            const validarFechasDeTratamiento = (start_date, end_date) => {
                const fechaInicio = new Date(start_date);
                const fechaFin = new Date(end_date);
            
                if (fechaInicio<= fechaFin) {
                    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
                }
            
                return true;
            }

module.exports = {
    emailValido,
    RoleValido,
   existePacientePorID,
   existeDoctorPorID,
   existeUsuarioPorID,
   esFechaValida,
   validarFechasDeTratamiento
}