import Web3 from 'web3';
import crypto from 'crypto';
import certificadoJson from '../../build/contracts/Certificado.json' assert { type: 'json' };


const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const contrato = new web3.eth.Contract(certificadoJson.abi, '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1');

// Función para hash de certificado
function hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Función para hashear una firma
function hashearFirma(firma) {
    return crypto.createHash('sha256').update(firma).digest('hex');
}

async function emitirCertificado() {
    try {
        const cuentas = await web3.eth.getAccounts();
        if (cuentas.length === 0) {
            throw new Error('No se encontraron cuentas disponibles.');
        }
        
        const timestamp = Math.floor(Date.now() / 1000); // Fecha en formato timestamp
        const hashFirma = hashearFirma('firma_de_certificado'); // Hasheamos la firma

        const resultado = await contrato.methods.emitirCertificado(
            1, // id_estudiante como entero
            1, // id_nft como entero
            1, // id_curso como entero
            timestamp, // fecha_emision como entero
            hashFirma, // firma como string
            1, // id_estado como entero
            hashCertificado // hash del certificado como string
        ).send({ from: cuentas[0] });

        console.log('Certificado emitido:', resultado);
    } catch (error) {
        console.error('Error al emitir el certificado:', error);
    }
}

async function obtenerCertificado(id_certificado) {
    try {
        const resultado = await contrato.methods.obtenerCertificado(id_certificado.toString()).call();
        console.log('Certificado:', resultado);
    } catch (error) {
        console.error('Error al obtener el certificado:', error);
    }
}

// Ejemplo de uso
emitirCertificado();
obtenerCertificado(1);
