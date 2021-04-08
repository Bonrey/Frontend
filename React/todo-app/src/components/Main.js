import React from 'react';
import styled from 'styled-components';
import TodoList from './todo/TodoList';

import {lightTheme} from "../assets/styles/Colors";

const MainContainer = styled.main`
  margin-top: 13.5rem;
`

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
      todoItems: [
        { id: 0, text: "Completed online JavaScript course", completed: true },
        { id: 1, text: "Jog around the park", completed: false },
        { id: 2, text: "10 minutes meditation", completed: false },
        { id: 3, text: "Read for 1 hour", completed: false },
        { id: 4, text: "Pick up groceries", completed: false },
        { id: 5, text: "Complete Todo App on Frontend Mentor", completed: false }
      ],
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
        let newTodoItems = [...prevState.todoItems];
        newTodoItems.push({ id: prevState.idCount, text: prevState.newTodo, completed: false });
        return {
          todoItems: newTodoItems,
          idCount: prevState.idCount + 1,
          newTodo: "", leftNumber: prevState.leftNumber + 1
        };
      });
    }
  }

  handleCheckboxChange = id => {
    this.setState(prevState => {
      let newTodoItems = [...prevState.todoItems];
      for (let i = 0; i < newTodoItems.length; i++) {
        if (newTodoItems[i].id === id) {
          newTodoItems[i].completed = !prevState.todoItems[i].completed;
          return {
            todoItems: newTodoItems,
            leftNumber: newTodoItems[i].completed ? prevState.leftNumber - 1 : prevState.leftNumber + 1
          };
        }
      }
    });
  }

  clear = index => {
    this.setState(prevState => {
      let newTodoItems = [...prevState.todoItems];
      newTodoItems.splice(index, 1);
      return {
        todoItems: newTodoItems,
        leftNumber: prevState.todoItems[index].completed ? prevState.leftNumber : prevState.leftNumber - 1
      };
    });
  }

  handleOnDragEnd = result => {
    this.props.resetDrag();
    if (result.destination) {
      this.setState(prevState => {
        let newTodoItems = [...this.state.todoItems];
        const [reorderedItem] = newTodoItems.splice(result.source.index, 1);
        newTodoItems.splice(result.destination.index, 0, reorderedItem);
        return { todoItems: newTodoItems };
      });
    }
  }

  render() {
    return (
      <MainContainer>
        <TodoList
          todoItems={this.state.todoItems}
          onChange={id => this.handleCheckboxChange(id)}
          onRadioBtnChange={id => this.setState({ filter: id })}
          clear={index => this.clear(index)}
          clearAllCompleted={_ => this.setState({ todoItems: this.state.todoItems.filter(item => !item.completed) })}
          leftNumber={this.state.leftNumber}
          filter={this.state.filter}
          isDragging={this.props.isDragging}
          currDragIndex={this.props.currDragIndex}
          onDragStart={this.props.onDragStart}
          onDragUpdate={this.props.onDragUpdate}
          onDragEnd={this.handleOnDragEnd}
        />
        <BottomHint>Drag and drop to reorder list</BottomHint>
      </MainContainer>
    );
  }
}