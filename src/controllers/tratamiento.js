const Tratamiento = require ('../model/tratamiento');



const obtenerTratamientoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tratamiento = await Tratamiento.findById(id).populate('paciente_id doctor_id'); // nos trae el paciente y el doctor en mayusculas.
        res.json(tratamiento);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el tratamiento',
            error
        });
    }
}


const obtenerTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.find().populate('paciente_id')
        res.json(tratamientos);
    } catch (error) {
        console.error('Error al obtener los tratamientos:', error); // Loguea el error en la consola
        res.status(500).json({
            msg: 'Error al obtener los tratamientos',
            error: error.message // Proporciona el mensaje de error
        });
    }
}


const crearTratamiento = async (req, res) => {
    try {
        const { paciente_id, descripcion, start_date, end_date, estado } = req.body;

        const tratamiento = new Tratamiento({ paciente_id,  descripcion, start_date, end_date, estado });

        await tratamiento.save();

        res.json({
            msg: 'tratamiento creado correctamente',
            tratamiento
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear el tratamiento',
             error: error.message // Proporciona el mensaje de error
        });
    }
}


const actualizarTratamiento = async (req, res) => {
    const { id } = req.params;
    const { paciente_id, descripcion, start_date, end_date, estado } = req.body;

    try {
        const tratamiento = await Tratamiento.findByIdAndUpdate(id, { paciente_id, descripcion, start_date, end_date, estado }, { new: true });
        if (!tratamiento) {
            return res.status(404).json({
                msg: 'tratamiento no encontrado'
            });
        }
        res.json({
            msg: 'tratamiento actualizado correctamente',
            tratamiento
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el tratamiento.',
            error: error.message
        });
    }
}


const eliminarTratamiento = async (req, res) => { 
    const { id } = req.params;
    
    try {
        // Se elimina el await duplicado y se corrige el nombre del modelo a Appointment
        const tratamiento = await Tratamiento.findByIdAndUpdate(id, { estado: false });
        if (!tratamiento) {
            return res.status(404).json({
                msg: 'tratamiento no encontrado'
            });
        }
        res.json({
            msg: 'tratamiento eliminado correctamente',
            tratamiento
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el tratamiento',
            error: error.message
        });
    }
};


  
module.exports = {
obtenerTratamientoPorId,
obtenerTratamientos,
crearTratamiento,
actualizarTratamiento,
eliminarTratamiento
}