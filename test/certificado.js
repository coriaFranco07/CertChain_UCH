import Web3 from 'web3';
import assert from 'assert';
import certificadoJson from '../../build/contracts/Certificado.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
let contrato;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contrato = new web3.eth.Contract(certificadoJson.abi, '0x29ABB641653E9256dcA147466bEF00f3137a5Ac1'); // Dirección del contrato desplegado
});

it('debería emitir y verificar un certificado', async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    await contrato.methods.emitirCertificado(
        1,
        1,
        1,
        timestamp,
        'firma_de_certificado',
        1 // id_estado
    ).send({ from: accounts[0] });

    // Verificar el certificado desde el contrato inteligente
    const certificadoDesdeContrato = await contrato.methods.obtenerCertificado(0).call(); // Asegúrate de usar el ID correcto
    assert.strictEqual(parseInt(certificadoDesdeContrato.id_estudiante), 1);
    assert.strictEqual(parseInt(certificadoDesdeContrato.id_nft), 1);
    assert.strictEqual(parseInt(certificadoDesdeContrato.id_curso), 1);
    assert.strictEqual(parseInt(certificadoDesdeContrato.fecha_emision), timestamp);
    assert.strictEqual(certificadoDesdeContrato.firma, 'firma_de_certificado'); // Asegúrate de que el valor coincida con el hash si aplicable
    assert.strictEqual(parseInt(certificadoDesdeContrato.id_estado), 1);
});
