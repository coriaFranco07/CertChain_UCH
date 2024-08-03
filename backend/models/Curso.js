import mongoose from 'mongoose';

const CursoSchema = new mongoose.Schema({
    id_curso: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha_inicio: { type: Number, required: true },
    fecha_fin: { type: Number, required: true },
    id_estado: { type: Number, required: true }
});

const Curso = mongoose.model('Curso', CursoSchema);

export default Curso;
