import Web3 from 'web3';
import assert from 'assert';
import certificadoJson from '../../build/contracts/Certificado.json';
import crypto from 'crypto';

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
let contrato;
let accounts;

// Función para hashear todos los datos del certificado
function hashCertificado(id_estudiante, id_nft, id_curso, timestamp, hashFirma, id_estado) {
    const datos = `${id_estudiante}-${id_nft}-${id_curso}-${timestamp}-${hashFirma}-${id_estado}`;
    return crypto.createHash('sha256').update(datos).digest('hex');
}

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contrato = new web3.eth.Contract(certificadoJson.abi, '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1');
});

it('debería emitir y verificar un certificado', async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const idCertificado = '1'; // Convertir a string

    const id_estudiante = '1';
    const id_nft = '1';
    const id_curso = '1';
    const firma = 'firma_de_certificado';
    const id_estado = '1';

    const hashFirma = crypto.createHash('sha256').update(firma).digest('hex');
    const hashCertificadoValue = hashCertificado(id_estudiante, id_nft, id_curso, timestamp, hashFirma, id_estado);

    try {
        await contrato.methods.emitirCertificado(
            id_estudiante,
            id_nft,
            id_curso,
            timestamp.toString(),
            hashFirma,
            id_estado,
            hashCertificadoValue
        ).send({ from: accounts[0] });

        const certificadoDesdeContrato = await contrato.methods.obtenerCertificado(idCertificado).call();

        assert.strictEqual(certificadoDesdeContrato.id_estudiante, id_estudiante);
        assert.strictEqual(certificadoDesdeContrato.id_nft, id_nft);
        assert.strictEqual(certificadoDesdeContrato.id_curso, id_curso);
        assert.strictEqual(certificadoDesdeContrato.fecha_emision, timestamp.toString());
        assert.strictEqual(certificadoDesdeContrato.firma, hashFirma);
        assert.strictEqual(certificadoDesdeContrato.id_estado, id_estado);
        assert.strictEqual(certificadoDesdeContrato.hash_certificado, hashCertificadoValue);
    } catch (error) {
        assert.fail(`La prueba falló con el siguiente error: ${error.message}`);
    }
});
