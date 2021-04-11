import React from 'react';
import styled from 'styled-components';
import TodoList from './todo/TodoList';

import {darkTheme, lightTheme} from "../assets/styles/Colors";
import TodoCreate from "./todo/TodoCreate";
import data from "../data.json";

const BottomHint = styled.p`
  font-size: 0.8rem;
  padding: 3rem 0 6rem;
  text-align: center;
  transition: color 500ms;
  color: ${props => props.darkTheme ? darkTheme["dark-grayish-blue"] : lightTheme["dark-grayish-blue"]};
  
  @media only screen and (max-width: 600px) {
    padding-top: 7rem;
  }
`

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    // DEFAULT VALUES FOR THE FIRST LAUNCH
    if (!localStorage.getItem("todoItems")) {
      localStorage.setItem("idCount", data.idCount.toString());
      localStorage.setItem("leftNumber", data.leftNumber.toString());
      localStorage.setItem("todoItems", JSON.stringify(data.todoItems));
    }

    this.state = {
      idCount: Number.parseInt(localStorage.getItem("idCount")),
      leftNumber: Number.parseInt(localStorage.getItem("leftNumber")),
      todoItems: JSON.parse(localStorage.getItem("todoItems")),
      newTodo: "",
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

  componentDidUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    localStorage.setItem("idCount", this.state.idCount.toString());
    localStorage.setItem("leftNumber", this.state.leftNumber.toString());
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
    }, 600);
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
      }), 600);
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
        newTodoItems[i].showAnim = (newTodoItems[i].completed && prevState.filter === "active" && id !== "active") ||
          (!newTodoItems[i].completed && prevState.filter === "completed" && id !== "completed");
      }
      return { todoItems: newTodoItems, filter: id };
    });
    setTimeout(_ => this.setState(prevState => {
      let todoItems = [...prevState.todoItems];
      for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].showAnim = false;
      }
      return { todoItems };
    }), 600);
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