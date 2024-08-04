// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import {UCHCertification} from "../src/UCHCertification.sol";

contract DeployToScroll is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the contract
        // Counter counter = new Counter();
        UCHCertification certification = new UCHCertification();

        // Log the deployed contract address
        console.log("Deployed contract address:", address(certification));

        vm.stopBroadcast();
    }
}
