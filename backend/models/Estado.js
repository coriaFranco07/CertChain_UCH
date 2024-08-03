import mongoose from 'mongoose';

const EstadoSchema = new mongoose.Schema({
    id_estado: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true }
});

const Estado = mongoose.model('Estado', EstadoSchema);

export default Estado;
