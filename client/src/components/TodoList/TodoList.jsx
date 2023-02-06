import React from 'react';

import Todo from '../Todo/Todo';

class TodoList extends React.Component {
    render() {
        return (
            <div className='list'>
                {(this.props.todoList).map((todo, uuid) => {
                    return <Todo todo={todo} _id={uuid} key={uuid} deleteTodo={this.props.deleteTodo} />
                })}
            </div>
        )
    }
}

export default TodoList;