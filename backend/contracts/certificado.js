import Web3 from 'web3';
import certificadoJson from '../../build/contracts/Certificado.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const contrato = new web3.eth.Contract(certificadoJson.abi, '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1'); // Dirección actualizada del contrato

async function emitirCertificado() {
    const cuentas = await web3.eth.getAccounts();
    const resultado = await contrato.methods.emitirCertificado(
        'hash_de_certificado',
        cuentas[0], // id_estudiante
        1, // id_nft
        1, // id_curso
        Math.floor(Date.now() / 1000), // fecha_emision
        'firma_de_certificado'
    ).send({ from: cuentas[0] });
    console.log('Certificado emitido:', resultado);
}

async function obtenerCertificado(id_certificado) {
    const resultado = await contrato.methods.obtenerCertificado(id_certificado).call();
    console.log('Certificado:', resultado);
}

// Ejemplo de uso
emitirCertificado();
obtenerCertificado(1);
