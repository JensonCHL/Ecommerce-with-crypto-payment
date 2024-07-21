const { expect } = require("chai");

const tokens = (n)=>{
  return ethers.utils.parseUnits(n.toString(),'ether')
}

describe('Joekowi', () => {
  let sc;
  it('has a name', async () => {
    const Sc = await ethers.getContractFactory('SC')
    sc = await Sc.deploy()
    const name = await sc.name();
    expect(name).to.equal("JoeKowi")
  });
  
});
