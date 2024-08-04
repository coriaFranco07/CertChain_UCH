import express from 'express';
import mongoose from 'mongoose';
import { ethers } from 'ethers';
import Certificado from '../models/Certificado.js';
import dotenv from 'dotenv';
//import abi from '../../contracts/abi/contracts/UCHCertification.sol/UCHCertification.json' assert { type: 'json' };

dotenv.config();

const router = express.Router();

// Configuración de Mongoose
mongoose.connect('mongodb://localhost:27017/miDataBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// URLs de RPC
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const abi = [
    "function tokenURI(uint256 tokenId) external view returns (string memory)",
];

if (!SEPOLIA_RPC_URL || !PRIVATE_KEY || !contractAddress) {
    throw new Error('Faltan variables de entorno. Verifica tu archivo .env');
}

console.log('SEPOLIA_RPC_URL:', SEPOLIA_RPC_URL);
console.log('CONTRACT_ADDRESS:', contractAddress);

// Configuración de ethers
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Función para emitir y guardar certificado
async function emitirYGuardarCertificado(id_estudiante, id_nft, id_curso, fecha_emision, firma, id_estado, recipientAddress) {
    try {
        const timestamp = isNaN(fecha_emision) ? Math.floor(new Date(fecha_emision).getTime() / 1000) : parseInt(fecha_emision);
        if (isNaN(timestamp) || timestamp <= 0) {
            throw new Error('fecha_emision debe ser un timestamp válido en segundos');
        }

        const ipfsHash = ${id_estudiante}-${id_nft}-${id_curso}-${timestamp}-${firma}-${id_estado};

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

        const tx = await contract.issueCertificate(recipientAddress, ipfsHash);
        console.log(Transaction sent: ${tx.hash});

        const receipt = await tx.wait();
        console.log(Transaction confirmed: ${receipt.blockNumber});

        const event = receipt.events?.find(event => event.event === 'CertificateIssued');
        if (event) {
            const tokenId = event.args.tokenId.toString();
            console.log(Certificate issued: ${tokenId});

            certificadoGuardado.tokenId = tokenId;
            await certificadoGuardado.save();
            console.log('Certificado actualizado en MongoDB con tokenId:', tokenId);
        }
    } catch (error) {
        console.error(Error al emitir o guardar el certificado: ${error});
        throw error;
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

    // Function to convert an IPFS hash to a URL using a public gateway
    function addIPFSProxy(ipfsHash) {
        const URL = "https://ipfs.io/ipfs/";
        const hash = ipfsHash.replace(/^ipfs?:\/\//, "");
        return URL + hash;
    }

    router.get('/consulta', async (req, res) => {
        try {
            const valor = await provider.getBlockNumber();
            console.log(valor);
            // Llamada al método tokenURI del contrato
            /* const uri = await contract.tokenURI(3);
            console.log('Token URI:', uri);
    
            // Recuperar los metadatos desde la URI
            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error(Error fetching metadata: ${response.statusText});
            }
            const metadata = await response.json();
            console.log('Metadata:', metadata);
    
            return ''; */
        } catch (error) {
            console.error('Error retrieving NFT metadata:', error);
            throw error;
        }
    });
    

export default router;