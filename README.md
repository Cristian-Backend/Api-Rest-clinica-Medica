# API REST Clínica Médica

Esta es una API REST para la gestión de una clínica médica, desarrollada con **Node.js** y **Express**, y utilizando **MongoDB** como base de datos. La API permite gestionar pacientes, doctores, usuarios, citas, autenticación, tratamientos, y realizar búsquedas en los registros médicos.

## Características

- Gestión de pacientes y doctores.
- Administración de citas y tratamientos médicos.
- Sistema de autenticación de usuarios.
- Realización de búsquedas en los registros médicos.
- Conexión a MongoDB para el almacenamiento de los datos.


## Tecnologias utilizadas
- Node.js: Para el backend.
- Express.js: Como framework para la creación de APIs.
- MongoDB: Base de datos NoSQL.
- Mongoose: ODM para MongoDB.
JWT: Autenticación con tokens.
Render: Despliegue en la nube.

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior).
- [MongoDB](https://www.mongodb.com/) o una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para la base de datos.
- [Git](https://git-scm.com/).

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Cristian-Backend/Api-Rest-clinica-Medica.git
   cd Api-Rest-clinica-Medica



## Instala las dependencias:
npm install


## Configura las variables de entorno. Crea un archivo .env en el directorio raíz con el siguiente contenido:
MONGODB_URI=<Tu_URL_de_Conexion_MongoDB>
PORT=3000

## Variables de entorno Variables de Entorno
MONGODB_URI: La URL de conexión a tu base de datos MongoDB.
PORT: El puerto en el que correrá el servidor. (Por defecto: 3000)

## Uso
Una vez configurado el entorno, puedes iniciar la API con el siguiente comando:
. npm start

Si prefieres trabajar en modo desarrollo (con reinicio automático):
npm run dev

La API estará disponible en  http://localhost:3000 o en el puerto especificado.

## Rutas Disponibles
Pacientes

- GET /api/pacientes: Obtener todos los pacientes.
- POST /api/pacientes: Crear un nuevo paciente.
- PUT /api/pacientes/:id: Actualizar la información de un paciente.
- DELETE /api/pacientes/:id: Eliminar un paciente.

## Doctores

- GET /api/doctores: Obtener todos los doctores.
- POST /api/doctores: Crear un nuevo doctor.
- PUT /api/doctores/:id: Actualizar la información de un doctor.
- DELETE /api/doctores/:id: Eliminar un doctor.

## Usuarios
- GET /api/usuarios: Obtener todos los usuarios.
- POST /api/usuarios: Crear un nuevo usuario.
- PUT /api/usuarios/:id: Actualizar la información de un usuario.
- DELETE /api/usuarios/:id: Eliminar un usuario.

## Citas
- GET /api/citas: Obtener todas las citas.
- POST /api/citas: Crear una nueva cita.
- PUT /api/citas/:id: Actualizar una cita.
- DELETE /api/citas/:id: Eliminar una cita.

## Autenticación
POST /api/login: Iniciar sesión con credenciales de usuario.


## Tratamientos
- GET /api/tratamientos: Obtener todos los tratamientos.
- POST /api/tratamientos: Crear un nuevo tratamiento.
- PUT /api/tratamientos/:id: Actualizar un tratamiento.
- DELETE /api/tratamientos/:id: Eliminar un tratamiento.

## Búsqueda
GET /api/buscar/:termino: Realizar una búsqueda en todos los registros (pacientes, doctores, citas, etc.).

## Autenticación
La API utiliza un sistema de autenticación basado en JSON Web Tokens (JWT). Para acceder a ciertas rutas protegidas, debes enviar un token válido en los headers de la solicitud.

Header:
Authorization: Bearer <token>
Despliegue
Despliegue en Render
Sube tu código a un repositorio de GitHub o GitLab.
En Render, selecciona New Web Service y conecta tu repositorio.

Configura las variables de entorno en Render para tu base de datos y el puerto.

Render proporcionará una URL que puedes usar para consumir la API en producción.