// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./OptimizedCalculator.sol";

contract AdvancedCalculator is OptimizedCalculator {
    function power(uint256 base, uint256 exponent) public pure onlyValidInputs(base,exponent) returns (uint256) {        
        return base ** exponent;
    }
} 