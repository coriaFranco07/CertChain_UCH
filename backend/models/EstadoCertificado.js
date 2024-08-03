import mongoose from 'mongoose';

const EstadoCertificadoSchema = new mongoose.Schema({
    id_estado_certificado: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true }
});

const EstadoCertificado = mongoose.model('EstadoCertificado', EstadoCertificadoSchema);

export default EstadoCertificado;