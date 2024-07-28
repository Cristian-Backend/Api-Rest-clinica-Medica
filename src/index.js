const express = require('express');
require('dotenv').config();

const { dbConection} = require('./database/db');
const rutaPacientes = require('./routes/pacientes.routes')
const rutasDoctores =require('./routes/doctores.routes')
const rutaUsuarios = require('./routes/doctores.routes')
const rutaCitas = require('./routes/citas.routes')
const rutasAuth = require('./routes/auth.routes')
const rutrasTratamientos = require('./routes/tratamiento.routes')
const rutaBuscar = require('./routes/buscar.routes')

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rutas.
app.use('/api', rutaPacientes);
app.use('/api', rutasDoctores); 
app.use('/api', rutaUsuarios); 
app.use('/api', rutaCitas);
app.use('/api', rutasAuth)
app.use('/api', rutrasTratamientos)
app.use('/api/buscar', rutaBuscar)

app.listen(PORT,()=> {
    dbConection()
console.log('listening on port',PORT);
})
