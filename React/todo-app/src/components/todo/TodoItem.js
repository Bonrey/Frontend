import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import {Draggable} from "react-beautiful-dnd";
import {lightTheme, darkTheme} from "../../assets/styles/Colors";

const ListItem = styled.li`
  position: relative;
  height: 3.6rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-right: 1.2rem;
  transition: background-color 500ms, color 500ms, border-bottom 500ms;
  background-color: ${props => props.darkTheme ? darkTheme["very-dark-desaturated-blue"] : "white"};
  border-bottom: 0.05rem solid ${props => props.darkTheme ?
      darkTheme["very-dark-grayish-blue-2"] :
      lightTheme["very-light-grayish-blue"]};
  
  &:hover a svg {
    opacity: 1;
  }
`

const CrossButton = styled.a`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 1rem;
  height: 1rem;
  
  svg {
    display: inline-block;
    position: absolute;
    opacity: 0;
    transition: opacity 400ms;
    
    @media only screen and (max-width: 425px) {
      opacity: 1;
    }
  }
`

export default function TodoItem(props) {
  function getItemStyle(isDragging, draggableStyle) {
    return {
      borderRadius: isDragging && props.currDragIndex === 0 ? "0.4rem 0.4rem 0 0" : "0",
      boxShadow: !isDragging ? "none" :
        "0 0 0.2rem hsla(235, 19%, 35%, 0.2), 0 0 0.4rem hsla(235, 19%, 35%, 0.2), 0 0 0.8rem hsla(235, 19%, 35%, 0.2)",
      cursor: "default",
      ...draggableStyle,
    };
  }

  return (
    <Draggable draggableId={props.item.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <ListItem ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  darkTheme={props.darkTheme}>
          <Checkbox
            id={props.item.id} text={props.item.text}
            completed={props.item.completed} onChange={props.onChange}
            darkTheme={props.darkTheme}
          />
          <CrossButton onClick={_ => props.clear(props.index)}>
            <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" width="100%" height="100%">
              <path fill="#494C6B"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
          </CrossButton>
        </ListItem>)}
    </Draggable>
  );
}

