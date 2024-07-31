import express from 'express';
import Web3 from 'web3';
import estudiante from '../contracts/estudiante.js'; // Asegúrate de usar la extensión .js si es necesario

const router = express.Router();
const web3 = new Web3('http://localhost:8545'); // Cambia según sea necesario

router.post('/addEstudiante', async (req, res) => {
  const { nombre, apellido, email, fecha_nacimiento, id_estado } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();
    const resultado = await estudiante.methods.registrarEstudiante(nombre, apellido, email, fecha_nacimiento, id_estado).send({ from: accounts[0] });
    res.json({ success: true, resultado });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

export default router;
