const {response } = require('express')
const bcryptjs = require('bcryptjs')
const Doctor = require('../model/doctor')
const { generarJWT } = require('../helpers/generar-token')

const login = async(req,res = response) => {


    const {correo,password} = req.body

    try {

        // traemos al correo de la base de datos.
        const doctor = await Doctor.findOne({correo}) // traemos al correo.
        
        if(!doctor){ // si no existe el correo en la base de datos.
            res.status(400).json({
                msg: 'el usuario/  y/o password son incorrectos'
            })
        }

        // verificamos el estado del usuario

        if(!doctor.estado) { // si el estado de el usuario es falso
            res.status(400).json({
                msg: 'El usuario y / o password son incorrectos. - estado - false'
            })
        }


        // verificiar contraseña  con la de la base de datos 
        const passwordValido = bcryptjs.compareSync(password, doctor.password) //Validamos la contraseña que ingresamos con la contraseña de la base de datos.
            if(!passwordValido) {
            res.status(400).json({
                msg: 'el usuario / Password no son correctos - password'
            })
        }


        //Generar token / podemos generar el token aca pero los ponemos en helpers para que el codigo este mas limpio con un new promise
        const token = await generarJWT(doctor.id)

        res.json({
            doctor,
            token
        })

        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
             msg: 'Hable con el administrador'
         })

    }


}

module.exports = {
    login
}