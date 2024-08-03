import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const AdministradorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    id_estado: { type: Number, required: true }
});


// Método para comparar contraseñas
AdministradorSchema.methods.compararContraseña = async function(contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};


const Administrador = mongoose.model('Administrador', AdministradorSchema);

export default Administrador;
