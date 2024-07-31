import Web3 from 'web3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const web3 = new Web3('http://localhost:8545');

// Leer el ABI desde el archivo JSON
const contratoABI = JSON.parse(readFileSync(resolve(__dirname, '../../build/contracts/Estado.json'), 'utf8'));
const contratoDireccion = '0x3ef34F86412E292DBD4A7dd16a0ca3F613BD185d';  // Dirección del contrato desplegado

const estado = new web3.eth.Contract(contratoABI.abi, contratoDireccion);

export default estado;
