import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import ABI from './EthTop.json';
const ADDRESS = '0x2cC088354fD84ebE937550897722dCf665f40eE5';

class App extends Component {
  componentDidMount = async () => {

    // getting account via metamask
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);

    // connection to the contract
    const Top = new web3.eth.Contract(ABI.abi, ADDRESS);
    console.log(Top);
  }

  render() {
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
