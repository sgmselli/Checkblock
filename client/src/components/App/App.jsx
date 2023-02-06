import React from 'react';
import Web3 from 'web3';

import './App.css';
import Blockchain from '../Blockchain/Blockchain';
import TodoList from '../../contracts/TodoList.json';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      abi : TodoList.abi,
      address : this.getAddress()
    }
  }

  async getAddress() {
    const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
    const id = await web3.eth.net.getId();
    const deployedNet = TodoList.networks[id];
    const address = deployedNet.address
    return address;
  }

  
  render() {
    return (
      <div className="App">
   
          <Blockchain abi={this.state['abi']} address={this.state['address']}/>
      
      </div>
    )
  }
}

export default App;
