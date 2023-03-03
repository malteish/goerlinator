// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.19;

import "../lib/forge-std/src/Test.sol";
import "../contracts/Goerlinator.sol";

contract GoerlinatorTest is Test {
    Goerlinator goerlinator;

    uint256 claimAmount = 1 ether;

    address owner = address(3);
    address eligibleAddress1 = address(10);
    address eligibleAddress2 = address(11);
    address notEligibleAddress = address(20);

    function setUp() public {
        goerlinator = new Goerlinator(claimAmount);
        goerlinator.transferOwnership(owner);
        vm.deal(owner, 834 ether);
        vm.prank(owner);
        payable(address(goerlinator)).transfer(200 ether);
        address[] memory eligibleAddresses = new address[](2);
        eligibleAddresses[0] = eligibleAddress1;
        eligibleAddresses[1] = eligibleAddress2;
        vm.prank(owner);
        goerlinator.makeAddressesEligible(eligibleAddresses);
    }

    function testOwnerCanWithdraw() public {
        assertTrue(goerlinator.owner() == owner);
        uint balanceBefore = address(owner).balance;
        uint contractBalanceBefore = address(goerlinator).balance;
        vm.prank(owner);
        goerlinator.withdraw();
        uint balanceAfter = address(owner).balance;
        assertEq(
            balanceAfter,
            balanceBefore + contractBalanceBefore,
            "Owner balance should increase by contract balance"
        );
        assertEq(
            address(goerlinator).balance,
            0,
            "Contract balance should be 0"
        );
    }

    function testNonOwnersCanNotWithdraw(address x) public {
        vm.assume(x != owner);
        vm.assume(x.balance == 0);
        uint balanceBefore = address(goerlinator).balance;

        vm.prank(address(x));
        vm.expectRevert("Ownable: caller is not the owner");
        goerlinator.withdraw();
        assertEq(address(x).balance, 0, "Address balance should be 0");
        assertEq(
            address(goerlinator).balance,
            balanceBefore,
            "Contract balance should not change"
        );
    }

    function testClaimForEligibleAddress(address _address) public {
        vm.assume(goerlinator.eligibleAddresses(_address) == false);
        uint balanceBefore = address(eligibleAddress1).balance;
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress1),
            true,
            "Address should be eligible"
        );
        vm.prank(_address);
        goerlinator.claimFor(eligibleAddress1);
        assertEq(
            address(eligibleAddress1).balance,
            balanceBefore + claimAmount,
            "Address balance should increase by claim amount"
        );
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress1),
            false,
            "Address should not be eligible after claiming"
        );
    }

    function testClaimForNotEligibleAddress(address _address) public {
        vm.assume(goerlinator.eligibleAddresses(_address) == false);
        uint balanceBefore = address(_address).balance;
        vm.prank(address(_address));
        vm.expectRevert("Address not eligible to claim");
        goerlinator.claimFor(_address);
        assertEq(
            address(_address).balance,
            balanceBefore,
            "Address balance should not change"
        );
        assertEq(
            goerlinator.eligibleAddresses(_address),
            false,
            "Address should still not be eligible after claiming"
        );
    }

    function testPauseAndUnpause() public {
        vm.prank(owner);
        goerlinator.pause();
        vm.prank(eligibleAddress1);
        vm.expectRevert("Pausable: paused");
        goerlinator.claimFor(eligibleAddress1);

        vm.prank(owner);
        goerlinator.unpause();
        vm.prank(eligibleAddress1);
        uint balanceBefore = address(eligibleAddress1).balance;
        goerlinator.claimFor(eligibleAddress1);
        assertEq(
            address(eligibleAddress1).balance,
            balanceBefore + claimAmount,
            "Address balance should increase by claim amount"
        );
    }

    function testMakeAddressesEligible(
        address _address1,
        address _address2
    ) public {
        vm.assume(goerlinator.eligibleAddresses(_address1) == false);
        vm.assume(goerlinator.eligibleAddresses(_address2) == false);
        address[] memory newAddresses = new address[](2);
        newAddresses[0] = _address1;
        newAddresses[1] = _address2;
        vm.prank(owner);
        goerlinator.makeAddressesEligible(newAddresses);
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress1),
            true,
            "Address 1 should be eligible"
        );
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress2),
            true,
            "Address 2 should be eligible"
        );
    }

    function testMakeAddressesEligibleWithEmptyArray() public {
        address[] memory newAddresses = new address[](0);
        vm.prank(owner);
        goerlinator.makeAddressesEligible(newAddresses);
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress1),
            true,
            "Address 1 should still be eligible"
        );
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress2),
            true,
            "Address 2 should still be eligible"
        );
    }

    function testMakeAddressesNotEligible(address _address) public {
        vm.assume(goerlinator.eligibleAddresses(eligibleAddress1) == true);
        vm.assume(goerlinator.eligibleAddresses(_address) == false);
        address[] memory newAddresses = new address[](2);
        newAddresses[0] = eligibleAddress1;
        newAddresses[1] = _address;
        vm.prank(owner);
        goerlinator.makeAddressesNotEligible(newAddresses);
        assertEq(
            goerlinator.eligibleAddresses(eligibleAddress1),
            false,
            "Address 1 should not be eligible"
        );
        assertEq(
            goerlinator.eligibleAddresses(_address),
            false,
            "Address x should not be eligible"
        );
    }

    function testClaimWhenNotFunded() public {
        vm.prank(owner);
        goerlinator.withdraw();
        assertEq(
            address(goerlinator).balance,
            0,
            "Contract balance should be 0"
        );
        uint balanceBefore = address(eligibleAddress1).balance;
        vm.expectRevert("Contract balance is too low");
        goerlinator.claimFor(eligibleAddress1);
        assertEq(
            address(eligibleAddress1).balance,
            balanceBefore,
            "Address balance should not change"
        );
    }

    function testSetClaimAmount(uint256 _newClaimAmount) public {
        vm.assume(_newClaimAmount > 0);
        vm.assume(_newClaimAmount != goerlinator.claimAmount());
        vm.assume(_newClaimAmount < 100 ether);
        uint oldClaimAmount = goerlinator.claimAmount();
        vm.prank(owner);
        goerlinator.setClaimAmount(_newClaimAmount);
        assertEq(
            goerlinator.claimAmount(),
            _newClaimAmount,
            "Claim amount should be updated"
        );
        // test if new claim amount works
        console.log(eligibleAddress1.balance);
        uint balanceBefore = address(eligibleAddress1).balance;
        goerlinator.claimFor(eligibleAddress1);
        console.log(address(eligibleAddress1).balance);
        assertEq(
            address(eligibleAddress1).balance,
            balanceBefore + _newClaimAmount,
            "Address balance should increase by new claim amount"
        );
    }
}
