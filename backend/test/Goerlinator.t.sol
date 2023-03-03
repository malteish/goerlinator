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

    // function testFailNotOwnerRemove(address x) public {
    //     vm.assume(x != owner);
    //     vm.prank(address(x));
    //     vm.expectRevert();
    //     goerlinator.withdraw(address(0));
    // }

    // function testSet() public {
    //     assertTrue(goerlinator.map(address(0)) == 0);
    //     goerlinator.set(address(0), 1);
    //     assertTrue(goerlinator.map(address(0)) == 1);
    // }

    // function testSet2() public {
    //     assertTrue(goerlinator.map(address(1)) == 0);
    //     goerlinator.set(address(1), 2);
    //     assertTrue(goerlinator.map(address(1)) == 2);
    // }

    // function testSetFuzzingAddress(address x) public {
    //     assertTrue(goerlinator.map(address(x)) == 0);
    //     goerlinator.set(address(x), 1);
    //     assertTrue(goerlinator.map(address(x)) == 1);
    // }

    // function testSetFuzzingValue(uint256 x) public {
    //     assertTrue(goerlinator.map(address(0)) == 0);
    //     goerlinator.set(address(0), x);
    //     assertTrue(goerlinator.map(address(0)) == x);
    // }

    // function testRemove(address x) public {
    //     if (x == address(0)) return;
    //     assertTrue(goerlinator.map(address(0)) == 0);
    //     goerlinator.set(address(0), 1);
    //     assertTrue(goerlinator.map(address(0)) == 1);

    //     assertTrue(goerlinator.map(x) == 0);
    //     goerlinator.set(x, 1);
    //     assertTrue(goerlinator.map(x) == 1);

    //     goerlinator.remove(address(0));
    //     assertTrue(goerlinator.map(address(0)) == 0);
    //     assertTrue(goerlinator.map(x) == 1);

    //     goerlinator.remove(x);
    //     assertTrue(goerlinator.map(address(0)) == 0);
    //     assertTrue(goerlinator.map(x) == 0);
    // }
}
