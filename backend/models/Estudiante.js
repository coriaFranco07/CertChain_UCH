import mongoose from 'mongoose';

const EstudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
});

const Estudiante = mongoose.model('Estudiante', EstudianteSchema);

export default Estudiante;