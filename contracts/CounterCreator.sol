// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

import {Counter} from "./Counter.sol";

contract CounterCreator {

    Counter[] internal counters;

    function createCounter(uint256 _initialNumber) external payable {
        Counter newCounter = new Counter{value: msg.value}();
        newCounter.setNumber(_initialNumber);
        counters.push(newCounter);
        
        console.log("Ether received but stuck in CounterCreator:", msg.value/1000000000000000000);
    }

    function getCountersCount() external view returns (uint256) {
        return counters.length;
    }

    function getCounter(uint256 index) external view returns (address) {
        require(index < counters.length, "Counter index out of bounds");
        return address(counters[index]);
    }

    function getAllCounters() external view returns(address[] memory result) {
        result = new address[](counters.length);
            console.log("Counter length %s", counters.length);
        for(uint i = 0; i < counters.length; i++){
            console.log("Counter index %s", i);
            result[i] = address(counters[i]);
        }
    }
}
