// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
 
library Calculator {
    error InvalidInput();
 
    function add(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a + b;
    }
 
    function sub(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a - b;
    }
 
    function mul(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
       return a * b;
    }
 
    function div(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a / b;
    }
 
    modifier onlyValidInputs(uint256 a, uint256 b) {
        if(a == 0 && b == 0){
            revert InvalidInput();
        }
        _;
    }
}