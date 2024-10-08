const { response } = require('express')


const esAdminRole = ( req, res = response, next ) => {

    if ( !req.doctor ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.doctor;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRole = ( ...roles  ) => { // Para poner varios roles
    return (req, res = response, next) => {
        
        if ( !req.doctor ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.doctor.rol ) ) { // Si no esta incluido en los roles entonces.. // Esta en el MODELO.
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}