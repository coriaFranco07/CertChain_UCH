import express from 'express';
import mongoose from 'mongoose';
import { ethers } from 'ethers';
import Certificado from '../models/Certificado.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuración de Mongoose
mongoose.connect('mongodb://localhost:27017/myDataBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// URLs de RPC
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!SEPOLIA_RPC_URL || !PRIVATE_KEY || !contractAddress) {
    throw new Error('Faltan variables de entorno. Verifica tu archivo .env');
}

console.log('SEPOLIA_RPC_URL:', SEPOLIA_RPC_URL);
console.log('CONTRACT_ADDRESS:', contractAddress);

// Configuración de ethers
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
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
 * @param recipientAddress Dirección del receptor del certificado.
 */
async function emitirYGuardarCertificado(id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado, recipientAddress) {
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
        const tx = await contract.issueCertificate(recipientAddress, ipfsHash);
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
    const { id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado, recipientAddress } = req.body;

    try {
        await emitirYGuardarCertificado(id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado, recipientAddress);

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
