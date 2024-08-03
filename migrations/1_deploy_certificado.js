
const Certificado = artifacts.require("Certificado");

module.exports = function (deployer) {
  deployer.deploy(Certificado);
};
