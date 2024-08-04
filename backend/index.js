import express from 'express';
import dotenv from 'dotenv';
import connectDB from './bd.js'; // Asegúrate de que este archivo exista
import certificadoRoutes from './routes/certificadoRoutes.js';
import adminRoutes from './routes/administradorRoutes.js'; // Verifica que estos archivos existan
import loginRoutes from './routes/loginRoutes.js';
import estadoRoutes from './routes/estadoRoutes.js';
import estudianteRoutes from './routes/estududianteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Usa las rutas
app.use('/api/certificados', certificadoRoutes);
app.use('/api/administradores', adminRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/estado', estadoRoutes);
app.use('/api/estudiante', estudianteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
