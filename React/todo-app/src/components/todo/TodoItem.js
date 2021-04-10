import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import {Draggable} from "react-beautiful-dnd";
import "./list-item.css";

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
  width: 0.9rem;
  height: 0.9rem;
  
  svg {
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
      cursor: "default",
      ...draggableStyle,
    };
  }

  const [visible, setVisibility] = useState(true);
  useEffect(_ => {
    setTimeout(_ => setVisibility(!props.hidden), props.hidden ? 800 : 0);
  });

  return visible ?
    <Draggable draggableId={props.item.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <li ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  className={`list-item
                    ${props.darkTheme ? " dark-theme" : ""}
                    ${props.item.clearAnim ? " clear-item" : props.item.showAnim ? " show-item" : ""}
                  `}>
          <Checkbox
            id={props.item.id} text={props.item.text}
            completed={props.item.completed} onChange={props.onChange}
            darkTheme={props.darkTheme}
          />
          <CrossButton onClick={_ => props.clear(props.index)}>
            <svg viewBox="0 0 18 18" preserveAspectRatio="xMinYMin meet" width="100%" height="100%">
              <path fill="#494C6B"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
          </CrossButton>
        </li>)}
    </Draggable> : <div />;
}
