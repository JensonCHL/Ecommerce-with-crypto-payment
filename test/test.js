const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5
describe('Joekowi', () => {
  let sc;
  let deployer, buyer;
  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners()
    // console.log(deployer.address,buyer.address)
    const Sc = await ethers.getContractFactory('SC')
    sc = await Sc.deploy()
    // await sc.waitForDeployment();
    SCAddress = await sc.getAddress();
    // 
  })

  describe('Deployment', () => {
    it('ensure owner', async () => {
      expect(await sc.owner()).to.equal(deployer.address);
    });

  });
  describe('Listing', () => {
    let transaction

    beforeEach(async () => {
      transaction = await sc.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait()
    })
    it('returns item attributes', async () => {
      const item = await sc.items(ID)
      expect(item.id).to.equal(ID)
    });
    it('emit list event', () => {
      expect(transaction).to.emit(sc, "List")
    });


  });

  describe('Listing', () => {
    let transaction

    beforeEach(async () => {
      transaction = await sc.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait()
      transaction = await sc.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()

    })


    it('update contract balance', async () => {
      if (!SCAddress) {
        throw new Error('Contract address is not defined');
      }
      const result = await ethers.provider.getBalance(SCAddress)
      expect(result).to.equal(COST)
    })

    it('update buyers order count',async () => {
      const result = await sc.orderCount(buyer.address);
      expect(result).to.equal(1)
    });
    it('Adds order', async() => {
      const order = await sc.orders(buyer.address,1)
      expect(order.time).to.be.greaterThan(0)
      expect(order.item.name).to.equal(NAME)

    });
    
    

  });





});
