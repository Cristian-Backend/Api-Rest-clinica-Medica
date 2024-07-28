const Cita = require ('../model/citas');



const obtenerCitaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findById(id).populate('paciente_id doctor_id'); // nos trae el paciente y el doctor en mayusculas.
        res.json(cita);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la cita',
            error
        });
    }
}


const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find().populate('paciente_id').populate('doctor_id');
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener las citas:', error); // Loguea el error en la consola
        res.status(500).json({
            msg: 'Error al obtener las citas',
            error
        });
    }
}


const crearCita = async (req, res) => {
    try {
        const { paciente_id, doctor_id, fecha, razon, estadoCita, notas } = req.body;

        const cita = new Cita({ paciente_id, doctor_id, fecha, razon ,estadoCita, notas });

        await cita.save();

        res.json({
            msg: 'Cita creada correctamente',
            cita
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear la cita',
            error
        });
    }
}


const actualizarCita = async (req, res) => {
    const { id } = req.params;
    const { paciente_id, doctor_id, fecha, razon, estadoCita, notas } = req.body;

    try {
        const cita = await Cita.findByIdAndUpdate(id, { paciente_id, doctor_id, fecha, razon, estadoCita, notas }, { new: true });
        if (!cita) {
            return res.status(404).json({
                msg: 'Cita no encontrada'
            });
        }
        res.json({
            msg: 'Cita actualizada correctamente',
            cita
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar la cita',
            error
        });
    }
}


const eliminarCita = async (req, res) => { 
    const { id } = req.params;
    
    try {
        // Se elimina el await duplicado y se corrige el nombre del modelo a Appointment
        const cita = await Cita.findByIdAndUpdate(id, { estado: false });
        if (!cita) {
            return res.status(404).json({
                msg: 'Cita no encontrada'
            });
        }
        res.json({
            msg: 'Cita eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar la cita',
            error
        });
    }
};


  
module.exports = {
obtenerCitaPorId,
obtenerCitas,
crearCita,
actualizarCita,
eliminarCita
}