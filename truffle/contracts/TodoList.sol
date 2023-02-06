// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
  mapping(address => uint) todoCount;
  mapping(address => string[]) todoList;

  function getTodo(address _address) view public returns(string[] memory) {
    return todoList[_address];
  }

  function getCount(address _address) view public returns(uint) {
    return todoCount[_address];
  }

  function addTodo(string memory _todo, address _address) public {
    todoList[_address].push(_todo);
    todoCount[_address] += 1;
  }

  function deleteTodo(uint _index, address _address) public {
      require(_index < todoCount[_address], "index out of bound");

        for (uint i = _index; i < todoCount[_address] - 1; i++) {
            todoList[_address][i] = todoList[_address][i + 1];
        }
      todoList[_address].pop();
      todoCount[_address] -= 1;
    }

}
