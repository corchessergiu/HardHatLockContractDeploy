const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Counter", function () {
  async function deployCounterFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the initial number to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      expect(await counter.number()).to.equal(0);
    });
  });

  describe("Functions", function () {
    describe("setNumber", function () {
      it("Should set the number to the provided value", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        
        const newNumber = 42;
        await counter.setNumber(newNumber);
        
        expect(await counter.number()).to.equal(newNumber);
      });

      it("Can be called by any account", async function () {
        const { counter, otherAccount } = await loadFixture(deployCounterFixture);
        
        const newNumber = 100;
        await counter.connect(otherAccount).setNumber(newNumber);
        
        expect(await counter.number()).to.equal(newNumber);
      });
    });

    describe("increment", function () {
      it("Should increment the number by 1", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        
        expect(await counter.number()).to.equal(0);
        
        await counter.increment();
        
        expect(await counter.number()).to.equal(1);
      });

      it("Should work with non-zero initial values", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        
        const initialValue = 41;
        await counter.setNumber(initialValue);
        
        await counter.increment();
        
        expect(await counter.number()).to.equal(initialValue + 1);
      });

      it("Can be called by any account", async function () {
        const { counter, otherAccount } = await loadFixture(deployCounterFixture);
        
        expect(await counter.number()).to.equal(0);
        
        await counter.connect(otherAccount).increment();
        
        expect(await counter.number()).to.equal(1);
      });
    });
  });
});
