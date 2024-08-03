import express from 'express';
import Estado from '../models/Estado.js';

const router = express.Router();

router.post('/addEstado', async (req, res) => {
    const { nombre } = req.body;  

    try {
        const nuevoEstado = new Estado({
            nombre,
        });

        // Guardar el nuevo estado en la base de datos
        const estadoGuardado = await nuevoEstado.save();

        // Responder con un mensaje de éxito
        res.status(201).json({
            success: true,
            message: 'Estado creado con éxito',
            data: estadoGuardado
        });

        console.log('Estado registrado con éxito!!!');

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
