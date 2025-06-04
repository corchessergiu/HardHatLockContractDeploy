require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      evmVersion: "paris",
    },
  },
  networks: {
    ICBTestnet: {
      url: "https://rpc1-testnet.icbnetwork.info",
      chainId: 73114,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    ICBMainnet: {
      url: "https://rpc2-mainnet.icbnetwork.info",
      chainId: 73115,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};