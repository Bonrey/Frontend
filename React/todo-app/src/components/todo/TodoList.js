import React, {useState} from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import TodoItem from './TodoItem';
import TodoStats from "./TodoStats";
import {lightTheme} from "../../assets/styles/Colors";

const Container = styled.ul`
  border-radius: 0.4rem;
  overflow: hidden;
  filter: drop-shadow(0 0 1rem ${lightTheme["dark-grayish-blue"]});
`

export default function TodoList(props) {
  let todoItems = [], index = 0;
  for (let key in props.todoItems) {
    if (props.todoItems.hasOwnProperty(key) && (
      props.filter === "all" ||
      (props.filter === "active" && !props.todoItems[key].completed) ||
      (props.filter === "completed" && props.todoItems[key].completed))) {
      todoItems.push(<TodoItem
        key={key} id={key} index={index++}
        todoText={props.todoItems[key].text}
        completed={props.todoItems[key].completed}
        onChange={props.onChange}
        onClick={_ => props.clear(key)}
      />);
    }
  }

  const [items, updateItems] = useState(props.todoItems);

  return (
    <Container>
      <DragDropContext>
        <Droppable droppableId="todo-list">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {todoItems}
              {/*{provided.placeholder}*/}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <TodoStats
        leftNumber={props.leftNumber}
        filter={props.filter}
        onChange={props.onRadioBtnChange}
        onClick={props.clearAllCompleted}
      />
    </Container>
  );
}