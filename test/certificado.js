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

it('debería emitir un certificado', async () => {
    await contrato.methods.emitirCertificado(
        'hash_de_certificado',
        accounts[0],
        1,
        1,
        Math.floor(Date.now() / 1000),
        'firma_de_certificado'
    ).send({ from: accounts[0] });

    const certificado = await contrato.methods.obtenerCertificado(1).call();
    assert.strictEqual(certificado.hash, 'hash_de_certificado');
});
