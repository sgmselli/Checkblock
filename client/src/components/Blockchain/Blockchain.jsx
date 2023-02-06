import React from 'react';
import Web3 from 'web3';

import './Blockchain.css';
import Input from '../Input/Input';
import TodoList from '../TodoList/TodoList';

class Blockchain extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            todoList: [],
            todoCount: 0
        }

        this.loadBlockchain = this.loadBlockchain.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.countCall = this.countCall.bind(this);
        this.listCall = this.listCall.bind(this);
        this.addCall = this.addCall.bind(this);
        this.deleteCall = this.deleteCall.bind(this);
    }

    async countCall() {
        console.log(this.state['account'])
        const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
        const contract = new web3.eth.Contract(this.props.abi, await this.props.address)
        const count = await (contract).methods.getCount(this.state['account']).call();
        this.setState({ todoCount : count })
    }

    async listCall() {
        const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
        const contract = new web3.eth.Contract(this.props.abi, await this.props.address)
        const todoList = await (contract).methods.getTodo(this.state['account']).call();
        this.setState({ todoList : todoList })
    }

    async addCall(_todo) {
        const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
        const contract = new web3.eth.Contract(this.props.abi, await this.props.address)
        await (contract).methods.addTodo(_todo, this.state['account']).send({ from : this.state['account'] });
    }

    async deleteCall(_id) {
        const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
        const contract = new web3.eth.Contract(this.props.abi, await this.props.address)
        await (contract).methods.deleteTodo(_id, this.state['account']).send({ from : this.state['account'] });
    }

    async loadBlockchain() {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        this.setState({ account : account })
        
        const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
        const contract = new web3.eth.Contract(this.props.abi, await this.props.address)

        const count = await (contract).methods.getCount(account).call();
        this.setState({ todoCount : count })

        const todoList = await (contract).methods.getTodo(account).call();
        this.setState({ todoList : todoList })
        
    }

    async addTodo(_todo) {
        await this.addCall(_todo)
        this.countCall();
        this.listCall();
        
    }

    async deleteTodo(_id) {
        await this.deleteCall(_id);
        this.countCall();
        this.listCall();
    }
    
    render() {

        if (this.state['account'] === '') {
            return (
                <div className='center'>
                    <div className="connect">
                        <div className="loginBox">
                            <div className="title">
                                <h1>CheckBlock</h1>
                                <h3>CheckBlock is a decentralised todo list application on the ethereum blockchain.</h3>
                            </div>
                            <div>
                                <button className="button" onClick={this.loadBlockchain} >Connect</button>    
                            </div>                
                        </div>
                    </div>    
                </div>
                )
        } else {
            return (
                <div>
                    <div className='account'>
                        <h2>{this.state['account']}</h2>
                    </div>
                    <div className=''>
                        <Input addTodo={this.addTodo} getList={this.getList}/>
                        <TodoList todoList={this.state['todoList']} todoCount={this.state['todoCount']} deleteTodo={this.deleteTodo} />
                    </div>
                </div>
            )
        }
    }
}

export default Blockchain;