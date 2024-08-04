import mongoose from 'mongoose';

const certificadoSchema = new mongoose.Schema({
    id_estudiante: String,
    id_nft: String,
    id_curso: String,
    fecha_emision: Date,
    firma: String,
    id_estado: String,
    ipfsHash: String,
    tokenId: String
});

const Certificado = mongoose.model('Certificado', certificadoSchema);
export default Certificado;
