import React from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import TodoStats from "./TodoStats";
import TodoItem from "./TodoItem";

const Container = styled.div`
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 0 0.1rem hsla(235, 19%, 35%, 0.15),
              0 0 0.2rem hsla(235, 19%, 35%, 0.15),
              0 0 0.4rem hsla(235, 19%, 35%, 0.15),
              0 0 0.8rem hsla(235, 19%, 35%, 0.15);
`

export default class TodoList extends React.Component {
  render() {
    return (
      <Container>
        <DragDropContext
          onDragStart={this.props.onDragStart}
          onDragUpdate={this.props.onDragUpdate}
          onDragEnd={this.props.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {this.props.todoItems.map((item, index) => (
                  (this.props.filter === "all" ||
                    (this.props.filter === "active" && !item.completed) ||
                    (this.props.filter === "completed" && item.completed)) ?
                    <TodoItem
                      key={item.id} item={item} index={index}
                      onChange={this.props.onChange} clear={this.props.clear}
                      isDragging={this.props.isDragging}
                      currDragIndex={this.props.currDragIndex}
                      darkTheme={this.props.darkTheme}
                    /> : null))}
                {provided.placeholder}
              </ul>)}
          </Droppable>
        </DragDropContext>
        <TodoStats
          leftNumber={this.props.leftNumber}
          filter={this.props.filter}
          onChange={this.props.onRadioBtnChange}
          onClick={this.props.clearAllCompleted}
          darkTheme={this.props.darkTheme}
        />
      </Container>
    );
  }
}