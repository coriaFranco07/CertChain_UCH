import express from 'express';
import mongoose from 'mongoose';
import { ethers } from 'ethers';
import Certificado from './models/Certificado'; // Ajusta la ruta según la ubicación de tu modelo

const router = express.Router();

// Configuración de Mongoose
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Configuración de ethers
const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_OR_ALCHEMY_URL');
const privateKey = 'YOUR_PRIVATE_KEY'; // Private key of the contract owner
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const abi = [
    "function issueCertificate(address recipient, string ipfsHash) public onlyOwner returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

/**
 * Emite un nuevo certificado y lo guarda en MongoDB.
 * @param id_estudiante ID del estudiante.
 * @param id_nft ID del NFT.
 * @param id_curso ID del curso.
 * @param fecha_emision Fecha de emisión.
 * @param firma Firma del certificado.
 * @param id_estado ID del estado del certificado.
 */
async function emitirYGuardarCertificado(id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado) {
    try {
        // Convertir fecha_emision a timestamp si es una cadena de texto
        const timestamp = isNaN(fecha_emision) ? Math.floor(new Date(fecha_emision).getTime() / 1000) : parseInt(fecha_emision);

        // Verificar que fecha_emision sea un número entero
        if (isNaN(timestamp) || timestamp <= 0) {
            throw new Error('fecha_emision debe ser un timestamp válido en segundos');
        }

        // Generar el hash de IPFS (esto es un ejemplo, deberías generar el IPFS hash real)
        const ipfsHash = `${id_estudiante}-${id_nft}-${id_curso}-${timestamp}-${firma}-${id_estado}`;

        // Guardar en MongoDB
        const nuevoCertificado = new Certificado({
            id_estudiante,
            id_nft,
            id_curso,
            fecha_emision: new Date(fecha_emision),
            firma,
            id_estado,
            ipfsHash
        });

        const certificadoGuardado = await nuevoCertificado.save();
        console.log('Certificado guardado en MongoDB:', certificadoGuardado);

        // Emitir el certificado en el contrato inteligente
        const tx = await contract.issueCertificate('RECIPIENT_ADDRESS', ipfsHash);
        console.log(`Transaction sent: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`Transaction confirmed: ${receipt.blockNumber}`);

        // Obtener el tokenId del evento emitido
        const event = receipt.events?.find(event => event.event === 'CertificateIssued');
        if (event) {
            const tokenId = event.args.tokenId.toString();
            console.log(`Certificate issued: ${tokenId}`);

            // Actualizar el certificado en MongoDB con el tokenId
            certificadoGuardado.tokenId = tokenId;
            await certificadoGuardado.save();
            console.log('Certificado actualizado en MongoDB con tokenId:', tokenId);
        }
    } catch (error) {
        console.error(`Error al emitir o guardar el certificado: ${error}`);
        throw error; // Lanza el error para manejarlo en el controlador
    }
}

router.post('/emitir', async (req, res) => {
    const { id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado } = req.body;

    try {
        await emitirYGuardarCertificado(id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado);

        res.status(200).json({
            success: true,
            message: 'Certificado emitido y guardado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
