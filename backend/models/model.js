import mongoose from 'mongoose'; // Usa import en lugar de require si estás trabajando con módulos ES

// Esquema para Certificado
const esquemaCertificado = new mongoose.Schema({
    id_certificado: { type: Number, required: true, unique: true },
    id_estudiante: { type: Number, required: true },
    id_nft: { type: Number, required: true }, // Añadido para coincidir con el uso en tu código
    id_curso: { type: Number, required: true },
    fecha_emision: { type: Number, required: true }, // Cambiado a Number para usar timestamp
    firma: { type: String, required: true }, // Definido el tipo de dato para la firma
    id_estado: { type: Number }, // Definido el tipo de dato para id_estado
    blockchainHash: { type: String, required: true }
});

// Modelo para Certificado
const Certificado = mongoose.model('Certificado', esquemaCertificado);

// Esquema para Estudiante
const esquemaEstudiante = new mongoose.Schema({
    id_estudiante: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    id_estado: { type: Number } // Incluido el campo id_estado
});

// Modelo para Estudiante
const Estudiante = mongoose.model('Estudiante', esquemaEstudiante);

// Exportar ambos modelos
export { Estudiante, Certificado };
