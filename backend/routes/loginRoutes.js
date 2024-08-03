import express from 'express';
import Administrador from '../models/Administrador.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar administrador por email
        const administrador = await Administrador.findOne({ email });
        if (!administrador) {
            return res.status(404).json({ success: false, message: 'Administrador no encontrado' });
        }

        // Mostrar la contraseña almacenada en la base de datos y la ingresada
        console.log('Contraseña almacenada :', administrador.contraseña);
        console.log('Contraseña ingresada:', contraseña);

        // Comparar la contraseña
        const esMatch = await administrador.compararContraseña(contraseña);
        if (!esMatch) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: administrador._id }, 'tu_clave_secreta', { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
