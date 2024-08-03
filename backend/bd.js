const mogoose = require('mongoose');

// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/my-database-name')

   // verificacion de bd
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB', error);
  });
