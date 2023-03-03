// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// taken from https://moveseventyeight.com/deploy-your-first-nft-contract-with-foundry#heading-prepare-a-basic-deployment-script

import "../lib/forge-std/src/Script.sol";
import "../contracts/Goerlinator.sol";

contract DeployGoerlinator is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log("Deployer address: ", deployerAddress);

        vm.broadcast(deployerPrivateKey);
        Goerlinator goerlinator = new Goerlinator(1 ether);

        console.log("Goerlinator deployed to: ", address(goerlinator));

        console.log(
            "Don't forget to transfer ownership to another address! Currently, the deployer is the owner."
        );
    }
}
