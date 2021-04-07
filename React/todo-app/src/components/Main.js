import React from 'react';
import styled from 'styled-components';
import TodoCreate from './todo/TodoCreate';
import TodoList from './todo/TodoList';

import {lightTheme} from "../assets/styles/Colors";

const BottomHint = styled.p`
  font-size: 0.8rem;
  padding: 3rem 0;
  text-align: center;
  color: ${lightTheme["dark-grayish-blue"]};
`

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: {
        0: { text: "Completed online JavaScript course", completed: true },
        1: { text: "Jog around the park", completed: false },
        2: { text: "10 minutes meditation", completed: false },
        3: { text: "Read for 1 hour", completed: false },
        4: { text: "Pick up groceries", completed: false },
        5: { text: "Complete Todo App on Frontend Mentor", completed: false }
      },
      idCount: 6,
      newTodo: "",
      leftNumber: 5,
      filter: "all"
    };
  }

  addNewItem = e => {
    e.preventDefault();
    if (this.state.newTodo.length > 0) {

      this.setState(prevState => {
        let newTodoItems = { ...prevState.todoItems };
        newTodoItems[prevState.idCount] = { text: prevState.newTodo, completed: false };
        return {
          todoItems: newTodoItems,
          idCount: prevState.idCount + 1, newTodo: "", leftNumber: prevState.leftNumber + 1
        };
      });
    }
  }

  handleCheckboxChange = id => {
    this.setState(prevState => {
      let newTodoItems = { ...prevState.todoItems };
      newTodoItems[id].completed = !prevState.todoItems[id].completed;
      return {
        todoItems: newTodoItems,
        leftNumber: newTodoItems[id].completed ? prevState.leftNumber - 1 : prevState.leftNumber + 1
      };
    });
  }

  clear = id => {
    this.setState(prevState => {
      let newTodoItems = { ...prevState.todoItems };
      let newLeftNumber = newTodoItems[id].completed ? prevState.leftNumber : prevState.leftNumber - 1;
      delete newTodoItems[id];
      return { todoItems: newTodoItems, leftNumber: newLeftNumber };
    });
  }

  clearAllCompleted = _ => {
    this.setState(prevState => {
      let newTodoItems = { ...prevState.todoItems };
      for (let i in newTodoItems) {
        if (newTodoItems.hasOwnProperty(i) && newTodoItems[i].completed) {
          delete newTodoItems[i];
        }
      }
      return { todoItems: newTodoItems };
    });
  }

  render() {
    return (
      <main>
        <TodoCreate
          onSubmit={this.addNewItem}
          onChange={e => this.setState({ newTodo: e.target.value })}
          value={this.state.newTodo}
        />
        <TodoList
          todoItems={this.state.todoItems}
          onChange={id => this.handleCheckboxChange(id)}
          onRadioBtnChange={id => this.setState({ filter: id })}
          clear={id => this.clear(id)}
          clearAllCompleted={this.clearAllCompleted}
          leftNumber={this.state.leftNumber}
          filter={this.state.filter}
        />
        <BottomHint>Drag and drop to reorder list</BottomHint>
      </main>
    );
  }
}