import express from 'express';
import Web3 from 'web3';
import crypto from 'crypto';
import certificadoJson from '../../build/contracts/Certificado.json' assert { type: 'json' };

const router = express.Router();
const web3 = new Web3('http://localhost:8545');
const contrato = new web3.eth.Contract(certificadoJson.abi, '0x29ABB641653E9256dcA147466bef00f3137a5ac1');

// Función para hashear una firma
function hashearFirma(firma) {
    return crypto.createHash('sha256').update(firma).digest('hex');
}

// Función para hashear todos los datos del certificado
function hashCertificado(id_estudiante, id_nft, id_curso, timestamp, hashFirma, id_estado) {
    const datos = `${id_estudiante}-${id_nft}-${id_curso}-${timestamp}-${hashFirma}-${id_estado}`;
    return crypto.createHash('sha256').update(datos).digest('hex');
}

router.post('/emitir', async (req, res) => {
    const { id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado } = req.body;

    try {
        // Obtener cuentas
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No se encontraron cuentas disponibles.'
            });
        }

        // Convertir fecha_emision a timestamp si es una cadena de texto
        const timestamp = isNaN(fecha_emision) ? Math.floor(new Date(fecha_emision).getTime() / 1000) : parseInt(fecha_emision);

        // Verificar que fecha_emision sea un número entero
        if (isNaN(timestamp) || timestamp <= 0) {
            return res.status(400).json({
                success: false,
                message: 'fecha_emision debe ser un timestamp válido en segundos'
            });
        }

        // Hashear la firma
        const hashFirma = hashearFirma(firma);

        // Hashear el certificado con todos los datos relevantes
        const hashCertificadoValue = hashCertificado(id_estudiante, id_nft, id_curso, timestamp, hashFirma, id_estado);

        // Enviar la transacción
        const tx = {
            from: accounts[0],
            gas: 2000000, // Ajusta el gas según sea necesario
            gasPrice: web3.utils.toWei('20', 'gwei') // Usar gasPrice en lugar de maxFeePerGas
        };

/*         const resultado = await contrato.methods.emitirCertificado(
            parseInt(id_estudiante),
            parseInt(id_nft),
            parseInt(id_curso),
            timestamp,
            hashFirma,
            parseInt(id_estado),
            hashCertificadoValue
        ).send(tx); */

        // Responder con los detalles de la transaccion y los datos enviados
        res.status(200).json({
            success: true,
            message: 'Certificado emitido con éxito',
            data: {
                inputData: {
                    id_estudiante,
                    id_nft,
                    id_curso,
                    fecha_emision,
                    hashFirma,
                    id_estado,
                    hashCertificado: hashCertificadoValue
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;

