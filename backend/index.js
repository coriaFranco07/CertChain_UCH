import express from 'express';
import dotenv from 'dotenv';
import estadoRoutes from './routes/estadoRoutes.js'; 
import estudianteRoutes from './routes/estudianteRoutes.js'; 

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

app.use('/estado', estadoRoutes);
app.use('/estudiante', estudianteRoutes);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
