import express from 'express';
import Estudiante from '../models/Estudiante.js'; 

const router = express.Router();

// Endpoint para agregar un nuevo estudiante
router.post('/addEstudiante', async (req, res) => {
    const { nombre, apellido, email } = req.body;

    try {
        // Crear una nueva instancia del modelo estudiante
        const nuevoEstudiante = new Estudiante({
            nombre,
            apellido,
            email,
        });

        // Guardar el nuevo Estudiante en la base de datos
        const estudianteGuardado = await nuevoEstudiante.save();

        // Responder con un mensaje de éxito
        res.status(201).json({
            success: true,
            message: 'Estudiante creado con éxito',
            data: estudianteGuardado
        }) 

        console.log('Estudiante registrado con exito!!!');

    } catch (error) {
        // Manejar errores
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
