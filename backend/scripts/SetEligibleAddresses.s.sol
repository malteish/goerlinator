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

        uint maxLines = 100000;

        console.log("Deployer address: ", deployerAddress);

        string memory addressFile = vm.envString("ADDRESS_FILE");
        address[] memory addresses = new address[](maxLines);

        for (uint256 i = 0; i < maxLines; i++) {
            //eligibleAddresses[_addresses[i]] = false;
            string memory addressString = vm.readLine(addressFile);
            bytes memory addressBytes = bytes(addressString);
            address addressNext = address(
                uint160(uint256(keccak256(addressBytes)))
            );
            addresses[i] = addressNext;
            //console.log("add: ", addressNext);
        }

        Goerlinator goerlinator = new Goerlinator(1 ether);
        // set eligible addresses
        goerlinator.makeAddressesEligible(addresses);

        // test that the addresses are eligible
        if (goerlinator.eligibleAddresses(addresses[0]) == true) {
            console.log("address 0 is eligible");
        }
    }
}