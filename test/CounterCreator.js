const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CounterCreator Tests", function () {
  const INITIAL_NUMBER = 42;
  const VALUE_SENT = ethers.parseEther("1");

  let counterCreatorInstance;
  let ownerSigner;
  let userSigner;

  before(async () => {
    const signers = await ethers.getSigners();
    ownerSigner = signers[0];
    userSigner = signers[1];

    const CounterCreatorFactory = await ethers.getContractFactory(
      "CounterCreator"
    );
    counterCreatorInstance = await CounterCreatorFactory.connect(
      ownerSigner
    ).deploy();
  });

  it("should demonstrate the stuck Ether problem", async () => {
    const initialBalance = await ethers.provider.getBalance(
      counterCreatorInstance.target
    );
    expect(initialBalance).to.equal(0);

    await counterCreatorInstance.connect(userSigner).createCounter(1, {
      value: VALUE_SENT,
    });

    const contractBalance = await ethers.provider.getBalance(
      counterCreatorInstance.target
    );
    expect(contractBalance).to.equal(VALUE_SENT);

    let targetContract = counterCreatorInstance.getCounter(0);
    const targetContractBalance = await ethers.provider.getBalance(targetContract);
    console.log("ETH received by Counter smart contract", ethers.formatEther(targetContractBalance));
    expect(targetContractBalance).to.equal(0);
  });

  it("should get all counters", async () => {
    await counterCreatorInstance.connect(userSigner).createCounter(10, {
      value: VALUE_SENT,
    });
    const allCounters = await counterCreatorInstance.getAllCounters();
    console.log("All counter addresses:", allCounters);
    
    for (let i = 0; i < allCounters.length; i++) {
      expect(allCounters[i]).to.not.equal(ethers.ZeroAddress);
      console.log(`Counter ${i} address:`, allCounters[i]);
    }
    
    for (let i = 0; i < allCounters.length; i++) {
      const individualAddress = await counterCreatorInstance.getCounter(i);
    }
  });
});
