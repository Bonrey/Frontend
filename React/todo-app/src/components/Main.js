import React from 'react';
import styled from 'styled-components';
import TodoList from './todo/TodoList';

import {darkTheme, lightTheme} from "../assets/styles/Colors";
import TodoCreate from "./todo/TodoCreate";

const BottomHint = styled.p`
  font-size: 0.8rem;
  padding: 3rem 0;
  text-align: center;
  transition: color 500ms;
  color: ${props => props.darkTheme ?
  darkTheme["dark-grayish-blue"] :
  lightTheme["dark-grayish-blue"]};
  
  @media only screen and (max-width: 600px) {
    padding-top: 7rem;
  }
`

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        { id: 0, text: "Completed online JavaScript course", completed: true, clearAnim: false, showAnim: false },
        { id: 1, text: "Jog around the park", completed: false, clearAnim: false, showAnim: false },
        { id: 2, text: "10 minutes meditation", completed: false, clearAnim: false, showAnim: false },
        { id: 3, text: "Read for 1 hour", completed: false, clearAnim: false, showAnim: false },
        { id: 4, text: "Pick up groceries", completed: false, clearAnim: false, showAnim: false },
        { id: 5, text: "Complete Todo App on Frontend Mentor", completed: false, clearAnim: false, showAnim: false }
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
        newTodoItems.push({
          id: prevState.idCount,
          text: prevState.newTodo,
          completed: false,
          clearAnim: false,
          showAnim: false
        });
        return {
          todoItems: newTodoItems,
          idCount: prevState.idCount + 1,
          newTodo: "", leftNumber: prevState.leftNumber + 1,
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
      newTodoItems[index].clearAnim = true;
      return { todoItems: newTodoItems };
    });

    setTimeout(_ => {
      this.setState(prevState => {
        let newTodoItems = [...prevState.todoItems];
        newTodoItems.splice(index, 1);
        return {
          todoItems: newTodoItems,
          leftNumber: prevState.todoItems[index].completed ? prevState.leftNumber : prevState.leftNumber - 1
        };
      });
    }, 800);
  }

  clearAllCompleted = _ => {
    this.setState(prevState => {
      let newTodoItems = [...prevState.todoItems];
      for (let i = 0; i < newTodoItems.length; i++) {
        if (newTodoItems[i].completed) {
          newTodoItems[i].clearAnim = true;
        }
      }
      return { todoItems: newTodoItems };
    });

    setTimeout(_ =>
      this.setState({
        todoItems: this.state.todoItems.filter(item => !item.completed)
      }), 800);
  }

  handleOnDragEnd = result => {
    this.props.resetDrag();
    if (result.destination) {
      this.setState(prevState => {
        let newTodoItems = [...prevState.todoItems];
        const [reorderedItem] = newTodoItems.splice(result.source.index, 1);
        newTodoItems.splice(result.destination.index, 0, reorderedItem);
        return { todoItems: newTodoItems };
      });
    }
  }

  handleRadioBtnChange = id => {
    this.setState(prevState => {
      let newTodoItems = [...prevState.todoItems];
      for (let i = 0; i < newTodoItems.length; i++) {
        if (newTodoItems[i].completed) {
          if (id === "active") {
            [newTodoItems[i].clearAnim, newTodoItems[i].showAnim] = [true, false];
          } else if (id === "completed") {
            [newTodoItems[i].clearAnim, newTodoItems[i].showAnim] = [false, false];
          } else {
            [newTodoItems[i].clearAnim, newTodoItems[i].showAnim] = [false, false];
          }
        } else {
          if (id === "completed") {
            [newTodoItems[i].clearAnim, newTodoItems[i].showAnim] = [true, false];
          } else {
            [newTodoItems[i].clearAnim, newTodoItems[i].showAnim] = [false, false];
          }
        }
      }
    });
  }

  render() {
    return (
      <main>
        <TodoCreate
          onSubmit={this.addNewItem}
          onChange={e => this.setState({ newTodo: e.target.value })}
          value={this.state.newTodo}
          darkTheme={this.props.darkTheme}
        />
        <TodoList
          todoItems={this.state.todoItems}
          onChange={id => this.handleCheckboxChange(id)}
          onRadioBtnChange={id => this.handleRadioBtnChange(id)}
          clear={index => this.clear(index)}
          clearAllCompleted={this.clearAllCompleted}
          leftNumber={this.state.leftNumber}
          filter={this.state.filter}
          isDragging={this.props.isDragging}
          currDragIndex={this.props.currDragIndex}
          onDragStart={this.props.onDragStart}
          onDragUpdate={this.props.onDragUpdate}
          onDragEnd={this.handleOnDragEnd}
          darkTheme={this.props.darkTheme}
          showItemAnimation={this.state.showItemAnimation}
        />
        <BottomHint darkTheme={this.props.darkTheme}>
          Drag and drop to reorder list
        </BottomHint>
      </main>
    );
  }
}