const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CounterError Contract", function () {
  let CounterError;
  let counter;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    CounterError = await ethers.getContractFactory("CounterError");
    [owner, addr1, addr2] = await ethers.getSigners();

    counter = await CounterError.deploy();
    await counter.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await counter.owner()).to.equal(owner.address);
    });

    it("Should initialize number to 0", async function () {
      expect(await counter.number()).to.equal(0);
    });

    it("Should set MAX_NUMBER to 100", async function () {
      expect(await counter.MAX_NUMBER()).to.equal(100);
    });
  });

  describe("setNumber function", function () {
    it("Should allow owner to set a valid number", async function () {
      await counter.setNumber(50);
      expect(await counter.number()).to.equal(50);
    });

    it("Should allow owner to set number to maximum limit", async function () {
      await counter.setNumber(100);
      expect(await counter.number()).to.equal(100);
    });

    it("Should allow owner to set same number multiple times", async function () {
      await counter.setNumber(25);
      expect(await counter.number()).to.equal(25);
      
      await counter.setNumber(25);
      expect(await counter.number()).to.equal(25);
    });

    it("Should revert when non-owner tries to set number", async function () {
      await expect(
        counter.connect(addr1).setNumber(50)
      ).to.be.revertedWith("Only owner can set the number");
    });

    it("Should revert when trying to set number above maximum", async function () {
      await expect(
        counter.setNumber(101)
      ).to.be.revertedWith("Number cannot exceed maximum limit");
    });

    it("Should revert when trying to set very large number", async function () {
      await expect(
        counter.setNumber(1000)
      ).to.be.revertedWith("Number cannot exceed maximum limit");
    });
  });

  describe("increment function", function () {
    it("Should allow owner to increment from 0", async function () {
      await counter.increment();
      expect(await counter.number()).to.equal(1);
    });

    it("Should allow owner to increment multiple times", async function () {
      await counter.increment();
      await counter.increment();
      await counter.increment();
      expect(await counter.number()).to.equal(3);
    });

    it("Should increment correctly after setNumber", async function () {
      await counter.setNumber(50);
      await counter.increment();
      expect(await counter.number()).to.equal(51);
    });

    it("Should revert when non-owner tries to increment", async function () {
      await expect(
        counter.connect(addr1).increment()
      ).to.be.revertedWith("Only owner can increment");
    });

    it("Should revert when trying to increment at maximum", async function () {
      await counter.setNumber(100);
      await expect(
        counter.increment()
      ).to.be.revertedWith("Cannot increment: would exceed maximum");
    });

    it("Should increment up to maximum limit", async function () {
      await counter.setNumber(99);
      await counter.increment();
      expect(await counter.number()).to.equal(100);
    });
  });

  describe("Combined operations", function () {
    it("Should handle mixed setNumber and increment operations", async function () {
      await counter.setNumber(10);
      expect(await counter.number()).to.equal(10);
      
      await counter.increment();
      expect(await counter.number()).to.equal(11);
      
      await counter.setNumber(50);
      expect(await counter.number()).to.equal(50);
    });

    it("Should maintain access control across operations", async function () {
      await counter.setNumber(50);
      
      await expect(
        counter.connect(addr1).increment()
      ).to.be.revertedWith("Only owner can increment");
      
      await expect(
        counter.connect(addr1).setNumber(75)
      ).to.be.revertedWith("Only owner can set the number");
    });

    it("Should handle boundary conditions correctly", async function () {
      await counter.setNumber(98);
      
      await counter.increment();
      expect(await counter.number()).to.equal(99);
      
      await counter.increment();
      expect(await counter.number()).to.equal(100);
      
      await expect(
        counter.increment()
      ).to.be.revertedWith("Cannot increment: would exceed maximum");
    });
  });

  describe("Error message consistency", function () {
    it("Should have consistent access control error messages", async function () {
      await expect(
        counter.connect(addr1).setNumber(50)
      ).to.be.revertedWith("Only owner can set the number");
      
      await expect(
        counter.connect(addr2).increment()
      ).to.be.revertedWith("Only owner can increment");
    });

    it("Should have consistent limit error messages", async function () {
      await expect(
        counter.setNumber(101)
      ).to.be.revertedWith("Number cannot exceed maximum limit");
      
      await counter.setNumber(100);
      await expect(
        counter.increment()
      ).to.be.revertedWith("Cannot increment: would exceed maximum");
    });
  });
});
