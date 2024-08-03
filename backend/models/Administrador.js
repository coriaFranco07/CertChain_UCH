import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdministradorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
});

const Administrador = mongoose.model('Administrador', AdministradorSchema);

export default Administrador;
