import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';


import Navigation from './components/Navigation';

import sc from './abis/SC.json'
import { config } from './config.json';



function App() {

  const [account, setAccount] = useState(null);

  const loadBloackchainData = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.getAddress(accounts[0])
    setAccount(account)

    console.log(account)
  }

  useEffect(() => {
    loadBloackchainData()
  }, [])

  return (
    <div className=''>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Welcome To Tokokucing</h2>
      <p></p>
      <p>{account}</p>
    </div>
  );


}

export default App;
