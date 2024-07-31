import express from 'express';
import Web3 from 'web3';
import estado from '../contracts/estado.js';

const router = express.Router();
const web3 = new Web3('http://localhost:8545');

router.post('/addEstado', async (req, res) => {
  const { nombre } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();

    // Enviar la transacción
    const tx = await estado.methods.addEstado(nombre).send({ from: accounts[0] });

    // Esperar la confirmación de la transacción
    const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);

    if (!receipt || !receipt.logs || receipt.logs.length === 0) {
      res.json({ success: false, error: 'No se encontraron logs de transacción.' });
      return;
    }

    // Decodificar eventos directamente de los logs
    const estadoAddedEventSignature = web3.eth.abi.encodeEventSignature('EstadoAdded(uint256,string)');
    const evento = receipt.logs.find(log => log.topics[0] === estadoAddedEventSignature);

    if (evento) {
      const decodedEvent = web3.eth.abi.decodeLog(
        [
          { type: 'uint256', name: 'id_estado', indexed: true },
          { type: 'string', name: 'nombre', indexed: false }
        ],
        evento.data,
        evento.topics.slice(1)
      );

      const { id_estado, nombre } = decodedEvent;
      res.json({
        success: true,
        resultado: { id_estado: id_estado.toString(), nombre }
      });
    } else {
      res.json({ success: true, resultado: { id_estado: 'No definido', nombre: 'No definido' } });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

export default router;
