const hre = require("hardhat")
const {items} = require("../src/items.json")

const tokens = (n) =>{
  return ethers.parseUnits(n.toString(),'ether')
}

async function main(){
  const [deployer] = await ethers.getSigners()
  const Joezon = await hre.ethers.getContractFactory("SC")
  const joezon = await Joezon.deploy()
  await joezon.waitForDeployment()
  JoeAddress = await joezon.getAddress();
  console.log(`Deployed contract at: ${JoeAddress}\n`)
  
  // List items..
  for (let i = 0; i < items.length; i++) {
    const transaction = await joezon.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )
    await transaction.wait()

    console.log(`listed item ${items[i].id}:${items[i].name}`)
    
  }


}

main().catch((error)=>{
  console.log(error);
  process.exitCode = 1;
})