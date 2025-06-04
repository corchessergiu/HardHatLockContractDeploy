# Example-deployment

## Initial setup for HardHat environement

## Steps:

```
npm init -y
```

```
npm install --save-dev hardhat
```

```
npx hardhat init
```

```
npm install @nomicfoundation/hardhat-toolbox
```

## Initial setup

1. Add a `.env` file (in the hardhat folder of the project) that contains the PRIVATE_KEY of the wallet that will be used to deploy the contracts

```
PRIVATE_KEY = XXXXXXXXXX
```

2. Install `dotenv` to allow the config files to read PRIVATE_KEY from `.env` file

```
npm i dotenv
```

## Hardhat

1. Create a deployment script


2. Update the `hardhat.config.js` file with these networks


3. Run the following command to deploy the contract

#### Mainnet
```
npx hardhat ignition deploy ./ignition/modules/Lock.js --network ICBMainnet
```


#### Testnet
```
npx hardhat ignition deploy ./ignition/modules/Lock.js --network ICBTestnet
```

4. You should see the addresses after running the above commands.
