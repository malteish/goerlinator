//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Goerlinator is Pausable, ReentrancyGuard, Ownable {
    mapping(address => bool) public eligibleAddresses;

    uint256 public claimAmount = 1 ether;

    event Claimed(address indexed user, uint256 amount);
    event ClaimAmountUpdated(uint256 claimAmount);

    /**
     * @dev Initializes the contract, setting the owner.
     */
    constructor(uint256 _claimAmount) Ownable() {
        claimAmount = _claimAmount;
        emit ClaimAmountUpdated(_claimAmount);
    }

    /**
     * @dev Claim goerli eth if you are eligible. Eligibility is nullified after claiming.
     */
    function claim() public whenNotPaused {
        claimFor(msg.sender);
    }

    /**
     * @dev Claim goerli eth for someone else if that address is eligible.
     * Eligibility is nullified after claiming.
     */
    function claimFor(address _address) public nonReentrant whenNotPaused {
        require(
            eligibleAddresses[_address] == true,
            "Address not eligible to claim"
        );
        eligibleAddresses[_address] = false;
        payable(_address).transfer(1 ether);
        emit Claimed(_address, 1 ether);
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
     * @dev Set the claim amount.
     */
    function setClaimAmount(uint _claimAmount) public onlyOwner {
        claimAmount = _claimAmount;
        emit ClaimAmountUpdated(_claimAmount);
    }

    /**
     * @dev Withdraws all the funds from the contract.
     */
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * @dev enables the contract to receive funds.
     */
    receive() external payable {}

    fallback() external payable {}
}
