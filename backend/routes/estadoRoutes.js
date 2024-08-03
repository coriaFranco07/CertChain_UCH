import express from 'express';
import Estado from '../models/Estado.js';

const router = express.Router();

// Crear múltiples estados
router.post('/addEstado', async (req, res) => {
    const nombre = req.body;

    try {
        const newEstados = await Estado.insertMany(nombre);
        res.status(201).json(newEstados);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
