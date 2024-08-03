import express from 'express';
import Web3 from 'web3';
import crypto from 'crypto';
import certificadoJson from '../../build/contracts/Certificado.json' assert { type: 'json' };

const router = express.Router();
const web3 = new Web3('http://localhost:8545');
const contratoDireccion = '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1';
const contrato = new web3.eth.Contract(certificadoJson.abi, contratoDireccion);

// Función para hashear una firma
function hashearFirma(firma) {
    return crypto.createHash('sha256').update(firma).digest('hex');
}

router.post('/emitir', async (req, res) => {
    const { id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado } = req.body;
    const accounts = await web3.eth.getAccounts();

    // Convertir fecha_emision a timestamp si es una cadena de texto
    const timestamp = isNaN(fecha_emision) ? Math.floor(new Date(fecha_emision).getTime() / 1000) : parseInt(fecha_emision);

    // Verificar que fecha_emision sea un número entero
    if (isNaN(timestamp) || timestamp <= 0) {
        return res.status(400).send({
            success: false,
            message: 'fecha_emision debe ser un timestamp válido en segundos'
        });
    }

    // Hashear la firma
    const hashFirma = hashearFirma(firma); 

    try {
        console.log(id_estudiante, id_curso, id_nft, timestamp, hashFirma, id_estado)
        // Enviar la transacción
        const resultado = await contrato.methods.emitirCertificado(
            id_estudiante, id_nft, id_curso, timestamp, hashFirma, id_estado
        ).send({ from: accounts[0] });

        res.status(200).send({
            success: true,
            message: 'Certificado emitido con éxito',
            data: resultado
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

export default router;
