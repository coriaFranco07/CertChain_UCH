const Estado = artifacts.require("Estado");

module.exports = function(deployer) {
  deployer.deploy(Estado).then(function(instance) {
    console.log("Estado contract deployed at address:", instance.address);
  });
};
