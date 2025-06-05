// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract CounterError {
    uint256 public number;
    uint256 public constant MAX_NUMBER = 100;
    address public owner;

    constructor() {
        owner = msg.sender;
        console.log("Contract deployed by:", owner);
        console.log("Initial number:", number);
        console.log("MAX_NUMBER:", MAX_NUMBER);
    }

    function setNumber(uint256 newNumber) public {
        console.log("setNumber called with:", newNumber);
        console.log("Current number:", number);
        console.log("Caller:", msg.sender);
        console.log("Owner:", owner);
        console.log("MAX_NUMBER:", MAX_NUMBER);
        
        require(
            msg.sender == owner,
            "Only owner can set the number"
        );
        
        require(
            newNumber <= MAX_NUMBER,
            "Number cannot exceed maximum limit"
        );

        number = newNumber;
        console.log("Number successfully set to:", newNumber);
    }

    function increment() public {
        console.log("increment called");
        console.log("Current number:", number);
        console.log("Caller:", msg.sender);
        
        require(
            msg.sender == owner,
            "Only owner can increment"
        );
        
        require(
            number < MAX_NUMBER,
            "Cannot increment: would exceed maximum"
        );

        number++;
        console.log("Number incremented to:", number);
    }

    function getState() public view returns (uint256 currentNumber, uint256 maxNumber, address currentOwner) {
        return (number, MAX_NUMBER, owner);
    }
}
