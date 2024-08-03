import mongoose from 'mongoose'; 

const esquemaCertificado = new mongoose.Schema({
    id_certificado: { type: Number, required: true, unique: true },
    id_estudiante: { type: Number, required: true },
    id_nft: { type: Number, required: true },
    id_curso: { type: Number, required: true },
    fecha_emision: { type: Number, required: true },
    firma: { type: String, required: true },
    id_estado: { type: Number },
    blockchainHash: { type: String, required: true }
});

const Certificado = mongoose.model('Certificado', esquemaCertificado);

const esquemaEstudiante = new mongoose.Schema({
    id_estudiante: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    id_estado: { type: Number }
});

const Estudiante = mongoose.model('Estudiante', esquemaEstudiante);

export { Estudiante, Certificado };
