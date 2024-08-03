import express from 'express';
import connectDB from './bd.js';  // Asegúrate de tener el archivo bd.js correcto
import certificadoRoutes from './routes/certificadoRoutes.js'; // Asegúrate de importar el archivo correcto

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Usa las rutas del certificado
app.use('/api/certificados', certificadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
