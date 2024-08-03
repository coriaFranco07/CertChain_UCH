import express from 'express';
import Web3 from 'web3';
import certificadoJson from '../../build/contracts/Certificado.json' assert { type: 'json' };

const router = express.Router();
const web3 = new Web3('http://localhost:8545');
const contratoDireccion = '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1';
const contrato = new web3.eth.Contract(certificadoJson.abi, contratoDireccion);

router.post('/emitir', async (req, res) => {
    const { hash, id_estudiante, id_nft, id_curso, fecha_emision, firma } = req.body;
    const accounts = await web3.eth.getAccounts();

    try {
        // Estimar el gas necesario para la transacción
        const gasEstimate = await contrato.methods.emitirCertificado(hash, id_estudiante, id_nft, id_curso, fecha_emision, firma)
            .estimateGas({ from: accounts[0] });

        // Enviar la transacción con el gas estimado
        await contrato.methods.emitirCertificado(hash, id_estudiante, id_nft, id_curso, fecha_emision, firma)
            .send({ from: accounts[0], gas: gasEstimate });

        res.status(200).send({ success: true, message: 'Certificado emitido con éxito' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

export default router;
