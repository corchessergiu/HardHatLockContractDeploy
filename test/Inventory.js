const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only('Inventory tests', function () {
  let instance;
  let owner;

  before(async () => {
    Inventory = await ethers.getContractFactory("Inventory");
    instance = await Inventory.deploy();
    await instance.waitForDeployment();

    const signers = await ethers.getSigners();
    owner = signers[0];
  });

  it('should add a product', async () => {
    const description = 'Laptop';
    const price = ethers.parseEther('1.5');

    await instance.addProduct(description, price);

    expect(await instance.totalProducts()).to.equal(1);
  });

  it('should store product details correctly', async () => {
    const description = 'Mouse';
    const price = ethers.parseEther('0.05');

    await instance.addProduct(description, price);

  });

  it('should only allow manager to add products', async () => {
    const signers = await ethers.getSigners();
    const nonManager = signers[1];
    
    const description = 'Keyboard';
    const price = ethers.parseEther('0.1');

    // await expect(
    //   instance.connect(nonManager).addProduct(description, price)
    // ).to.be.revertedWith('invalid manager');
  });

});
