
import Web3 from 'web3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const web3 = new Web3('http://localhost:8545');

// Leer el ABI desde el archivo JSON
const contratoABI = JSON.parse(readFileSync(resolve(__dirname, '../../build/contracts/Estudiante.json'), 'utf8'));
const contratoDireccion = '0xd2b6D5045F60481962090272B930379eea17AAB3';

const estudiante = new web3.eth.Contract(contratoABI.abi, contratoDireccion);

export default estudiante;

