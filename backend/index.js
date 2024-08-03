import express from 'express';
import mongoose from 'mongoose';
import connectDB from './bd.js';  // Asegúrate de tener el archivo bd.js correcto
import certificadoRoutes from './routes/certificadoRoutes.js'; // Asegúrate de importar el archivo correcto
import adminRoutes from './routes/administradorRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import estadoRoutes from './routes/estadoRoutes.js'; // Corrige el nombre de importación

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Usa las rutas del certificado
app.use('/api/certificados', certificadoRoutes);
app.use('/api/administradores', adminRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/estado', estadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
