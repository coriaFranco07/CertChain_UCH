const Estudiante = artifacts.require("Estudiante");

module.exports = function(deployer) {
  deployer.deploy(Estudiante).then(function(instance) {
    console.log("Estudiante contract deployed at address:", instance.address);
  });
};
