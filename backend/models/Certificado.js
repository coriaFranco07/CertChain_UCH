import mongoose from 'mongoose';

const certificadoSchema = new mongoose.Schema({
    id_certificado: { type: Number, required: true, unique: true },
    hash: { type: String, required: true },
    id_estudiante: { type: Number, required: true },
    id_curso: { type: Number, required: true },
    fecha_emision: { type: Number, required: true },
    firma: { type: String, required: true },
    id_estado: { type: Number, required: true }
});

const Certificado = mongoose.model('Certificado', certificadoSchema);

export default Certificado;
