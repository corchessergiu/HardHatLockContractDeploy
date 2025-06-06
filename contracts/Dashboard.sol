// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Dashboard {
    function showSpeed(uint speed) external pure returns (uint256) {
        require(speed > 0, "Speed must be greater than 0");
        return speed;
    }
}
