import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
// const ethers = require("ethers")

import Navigation from './components/Navigation';
import Section from './components/Section';

import SC from './abis/SCS.json'
import config from './config.json'



function App() {
  const [provider, setProvider] = useState(null);
  const [joezon, setJoezon] = useState(null);


  const [account, setAccount] = useState(null);

  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [toys, setToys] = useState(null);

  const togglePop = () => {
    console.log("pop")
  }

  const loadBloackchainData = async () => {
    // Connect to blockchain
    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(network)
    // connect to smart contract\
    const joezon = new ethers.Contract(
      config[network.chainId].joezon.address,
      SC,
      provider)
    setJoezon(joezon)

    const items = []

    for (var i = 1; i <= 9; i++) {
      const item = await joezon.items(i)
      items.push(item)
    }
    console.log(items)

    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)

  }

  useEffect(() => {
    loadBloackchainData()
  }, [])

  return (
    <div className='flex flex-col'>
      <Navigation account={account} setAccount={setAccount} />
      <h2
        className='text-[2rem] font-bold'
      >Tokokucing Best Sellers</h2>

      {electronics && clothing && toys && (
        <>
          <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop} />
          <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
          <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
        </>

      )}

      <p>{account}</p>
    </div>
  );


}

export default App;
