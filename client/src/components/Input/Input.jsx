import React from 'react';

import './Input.css'

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
    }

    add() {
        const todo = document.getElementById('inputTodo').value
        this.props.addTodo(todo)
    }

    render() {

        

        return (
            <div>
                <div className='inputs'>
                    <input id="inputTodo" type="text" placeholder="Enter todo"/>
                    <button className="addBtn" onClick={this.add}>Add todo</button>
                </div>
            </div>
        )
    }
}

export default Input;