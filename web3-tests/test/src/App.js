import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import ABI from './EthTop.json';
const ADDRESS = '0x040c2E1e3adEf81F8701b417E51B6d53d89Fa3bD';

class App extends Component {
  componentDidMount = async () => {
    window.ethereum.enable();
    // getting account via metamask
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log(accounts[0]);

    // connection to the contract
    const Top = new web3.eth.Contract(ABI.abi, ADDRESS);
    console.log(Top);

    //this.createPost(web3, Top, accounts[0], 'Post', 3);
    //this.getPost(Top, 1);
    //await this.getSortedPosts(web3, Top);
    //this.getAllPosts(Top);
    this.getTenPostTexts(Top);
  }

  createPost = (web3, Top, account, text, ether) => {
    Top.methods
      .createPost(text)
      .send({
        from: account,
        value: web3.utils.toWei(ether.toString(), 'ether')
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation');
        console.log(confirmationNumber);
        console.log(receipt);
      })
      .on('transactionHash', (hash) => {
        console.log('hash');
        console.log(hash);
      })
      .on('receipt', (receipt) => {
        console.log('receipt');
        console.log(receipt);
      })
      .on('error', console.error);
  }

  //returns promise
  getPost = ( Top, postId) => {
    return Top.methods
      .posts(postId)
      .call();
  }

  getSortedPosts = async (web3, Top) => {
    // этим способом можно получить правильный порядок айдишников постов. Работает.
    const ids = await Top.methods
      .getTopTenIds()
      .call();

    await Promise.all(
      ids.map( id => this.getPost(Top, id) )
    ).then( result => {
      const postsFormatted = result.map(post => this.normalizePost(web3, post));
      console.log(postsFormatted);
    })

  }

  getAllPosts = (Top) => {
    Top.methods.getAllPosts().call().then(console.log);
    // 0 - ids
    // 1 - prices
    // 2 - timestamps
    // 3 - authors
  }

  getTenPostTexts = (Top) => {
    Top.methods.getTenPostsTexts().call().then(console.log);
  }

  normalizePost = (web3, post) => {
    return {
      text: post.text,
      id: parseInt( post.id ),
      price: parseInt( post.price ),
      author: post.author,
      time: parseInt(post.timestamp) 
    }
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
