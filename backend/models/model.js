const mogoose = require('mongoose');

// Esquema Certificados
const esquemaCertifiado = new mongoose.Schema({
    id_certificado: { type: String, required: true, unique: true },
    id_estudiante: { type: String, required: true},
    id_curso: { type: String, required: true},
    fecha_emision: { type: Date, required: true},
    blockchainHash: {type: String, require: true}
})

// Esquema Certificados
const esquemaEstudiante = new mongoose.Schema({
    id_estudiante: { type: String, required: true, unique: true },
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    email: { type: Date, required: true},
    blockchainHash: {type: String, require: true}
})
