const mongoose = require('mongoose')

const dbConection = async ()=> {

    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          
        })

        console.log('BASE DE DATOS ONLINE')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }

}





module.exports = {
    dbConection
}