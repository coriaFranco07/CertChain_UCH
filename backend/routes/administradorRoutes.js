import express from 'express';
import Administrador from '../models/Administrador.js'; 

const router = express.Router();

// Endpoint para agregar un nuevo administrador
router.post('/addAdmin', async (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body;

    try {
        // Crear una nueva instancia del modelo Administrador
        const nuevoAdministrador = new Administrador({
            nombre,
            apellido,
            email,
            contraseña,
        });

        // Guardar el nuevo administrador en la base de datos
        const adminGuardado = await nuevoAdministrador.save();

        // Responder con un mensaje de éxito
        res.status(201).json({
            success: true,
            message: 'Administrador creado con éxito',
            data: adminGuardado
        }) 

        console.log('Administrador registrado con exito!!!');

    } catch (error) {
        // Manejar errores
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
