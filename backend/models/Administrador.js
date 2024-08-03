import mongoose from 'mongoose';

const AdministradorSchema = new mongoose.Schema({
    id_administrador: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    contraseña: { type: String, required: true},
    id_estado: { type: Number, required: true }
});

const Administrador = mongoose.model('Administrador', AdministradorSchema);

export default Administrador;