import mongoose from 'mongoose';

const EstudianteSchema = new mongoose.Schema({
    id_estudiante: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    id_estado: { type: Number, required: true }
});

const Estudiante = mongoose.model('Estudiante', EstudianteSchema);

export default Estudiante;