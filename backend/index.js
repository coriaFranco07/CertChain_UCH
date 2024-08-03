import express from 'express';
import bodyParser from 'body-parser';
import certificadoRoutes from './routes/certificadoRoutes.js';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/api/certificados', certificadoRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
