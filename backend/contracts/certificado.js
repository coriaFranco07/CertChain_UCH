import Web3 from 'web3';
import crypto from 'crypto';
import certificadoJson from '../../build/contracts/Certificado.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const contrato = new web3.eth.Contract(certificadoJson.abi, '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1'); // Dirección del contrato

// Función para hashear una firma
function hashearFirma(firma) {
    return crypto.createHash('sha256').update(firma).digest('hex');
}

async function emitirCertificado() {
    try {
        const cuentas = await web3.eth.getAccounts();
        const timestamp = Math.floor(Date.now() / 1000);
        const hashFirma = hashearFirma('firma_de_certificado'); // Hasheamos la firma

        const resultado = await contrato.methods.emitirCertificado(
            1, // id_estudiante como uint
            1, // id_nft como uint
            1, // id_curso como uint
            timestamp, // fecha_emision como uint
            hashFirma, // firma como string (hash de la firma)
            1 // id_estado como uint
        ).send({ from: cuentas[0] });

        console.log('Certificado emitido:', resultado);
    } catch (error) {
        console.error('Error al emitir el certificado:', error);
    }
}



async function obtenerCertificado(id_certificado) {
    const resultado = await contrato.methods.obtenerCertificado(id_certificado).call();
    console.log('Certificado:', resultado);
}

// Ejemplo de uso
emitirCertificado();
obtenerCertificado(1);
