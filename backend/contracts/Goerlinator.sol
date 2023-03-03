//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Goerlinator is Pausable, ReentrancyGuard, Ownable {
    mapping(address => bool) public eligibleAddresses;

    event Claimed(address indexed user, uint256 amount);

    /**
     * @dev Initializes the contract, setting the owner.
     */
    constructor() Ownable() {}

    /**
     * @dev Claim goerli eth if you are eligible. Eligibility is nullified after claiming.
     */
    function claim() public nonReentrant whenNotPaused {
        require(
            eligibleAddresses[msg.sender] == true,
            "You are not eligible to claim"
        );
        eligibleAddresses[msg.sender] = false;
        payable(msg.sender).transfer(1 ether);
        emit Claimed(msg.sender, 1 ether);
    }

    /**
     * @dev Add eligible addresses.
     */
    function makeAddressesEligible(
        address[] memory _addresses
    ) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            eligibleAddresses[_addresses[i]] = true;
        }
    }

    /**
     * @dev Withdraws all the funds from the contract.
     */
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
