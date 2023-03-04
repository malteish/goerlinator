// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// taken from https://moveseventyeight.com/deploy-your-first-nft-contract-with-foundry#heading-prepare-a-basic-deployment-script

import "../lib/forge-std/src/Script.sol";
import "../contracts/Goerlinator.sol";

contract SetEligibleAddresses is Script {
    function setUp() public {}

    function run() public {
        /*
         * these 2 variables need to be set manually
         */
        // count addresses in file using `wc -l <address_file>`, and paste result here
        uint totalNumberOfAddresses = 1106356;
        // set step to the number of the step you want to execute
        uint step = 0;

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        console.log("executing address: ", deployerAddress);

        Goerlinator goerlinator = Goerlinator(
            payable(0xdbC24a8F7bb96c546F854829959D97852446Ec58)
        );

        uint numberOfAddressesPerStep = 111111;
        uint numberOfSteps = totalNumberOfAddresses / numberOfAddressesPerStep;
        uint numberOfAddressesInLastStep = totalNumberOfAddresses %
            numberOfAddressesPerStep;
        console.log(
            "number of steps: ",
            numberOfSteps + 1,
            " starting with 0, ending with ",
            numberOfSteps
        );
        console.log(
            "number of addresses in last step: ",
            numberOfAddressesInLastStep
        );
        uint addressesProcessed = 0;

        require(step <= numberOfSteps, "step out of range");
        console.log("step: ", step, " of ", numberOfSteps);
        uint stepEnd = step * numberOfAddressesPerStep;

        //for (uint step = 0; step < numberOfSteps; step++) {
        uint stepStart = stepEnd;
        stepEnd = stepStart + numberOfAddressesPerStep > totalNumberOfAddresses
            ? totalNumberOfAddresses
            : stepStart + numberOfAddressesPerStep;

        string memory addressFile = vm.envString("ADDRESS_FILE");
        address[] memory addresses = new address[](stepEnd - stepStart);
        uint index = 0;

        for (uint256 i = stepStart; i < stepEnd; i++) {
            //eligibleAddresses[_addresses[i]] = false;
            string memory addressString = vm.readLine(addressFile);
            bytes memory addressBytes = bytes(addressString);
            address addressNext = address(
                uint160(uint256(keccak256(addressBytes)))
            );
            addresses[index] = addressNext;
            index = index + 1;
            addressesProcessed = addressesProcessed + 1;
            //console.log("add: ", addressNext);
        }

        // test that the addresses are eligible
        require(
            goerlinator.eligibleAddresses(addresses[0]) == false,
            "address 0 is already eligible"
        );

        // set eligible addresses
        //uint gasBefore = gasleft();
        vm.broadcast(deployerPrivateKey);
        goerlinator.makeAddressesEligible(addresses);
        vm.stopBroadcast();
        //uint gasAfter = gasleft();
        require(
            goerlinator.eligibleAddresses(addresses[0]) == true,
            "address 0 is eligible now"
        );
        console.log("step ", step, " completed");
        console.log("addresses processed: ", addressesProcessed);
        // console.log("gas used: ", gasBefore - gasAfter);
        // console.log(
        //     "gas used per address: ",
        //     (gasBefore - gasAfter) / (stepEnd - stepStart)
        // );
        // console.log(
        //     "estimated total cost at 1 gwei/gas: ",
        //     ((gasBefore - gasAfter) * 1e9) / 1e18,
        //     " ETH"
        // );
    }
}
