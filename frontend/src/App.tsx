import React from 'react';
import logo from './logo.svg';
import metamask from './metamask.svg';
import './App.css';
import { MetaMask } from './MetaMask';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Remaining keys in the store : 180
        </p>
        <p className='Title-Max-Font'>
            Connect MetaMask to redeem your keys!
        </p>
        <button className='Connect-Button'>
          <img src={metamask} width={36} height={36} alt="metamask"/>
            Connect Wallet
          </button>
      </header>
    </div>
  );
}

export default App;
