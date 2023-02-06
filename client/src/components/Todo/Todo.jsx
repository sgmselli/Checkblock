import React from 'react';

import './Todo.css'

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.deleteTodo(this.props._id)
    }

    render() {
        return (

            <div className="Todo">
                <h3>{this.props.todo}</h3>
                <button className="del" onClick={this.delete} >del</button>
            </div>
        )
    }
}

export default Todo;