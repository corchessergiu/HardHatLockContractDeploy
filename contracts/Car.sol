// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./Engine.sol";
import "./Dashboard.sol";
import "./Calculator.sol";

contract Car {
    using Calculator for uint256;

    Engine engine;
    Dashboard dashboard;
    uint256 speed;

    constructor(address _engine, address _dashboard) {
        engine = Engine(_engine);
        dashboard = Dashboard(_dashboard);
    }

    function startJourney() external view {
        uint256 localSpeed;
        
        engine.ignite();
        localSpeed =dashboard.showSpeed(100);
        speed.add(localSpeed);
    }
}
