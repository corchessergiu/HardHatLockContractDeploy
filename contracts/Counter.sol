// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Counter {
    uint256 public number;

    constructor() payable {
        console.log("Counter smart contract created with initial balance:", address(this).balance);
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
        console.log("Number incremented to", number);
    }
}
