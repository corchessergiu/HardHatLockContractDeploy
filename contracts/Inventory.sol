// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
 
contract Inventory {
    address immutable manager;
    uint256 public totalProducts;
 
    error InvalidManager();
 
    struct Product {
        string description;
        uint256 price;
    }
 
    event ProductCreated(uint256 id, Product product);
 
    constructor() {
        manager = msg.sender;
    }
 
    function addProduct(string memory description, uint256 price) external {
        if(msg.sender != manager){
            revert InvalidManager();
        }
 
        totalProducts++;
 
        emit ProductCreated(totalProducts, Product(description, price));
    }
} 