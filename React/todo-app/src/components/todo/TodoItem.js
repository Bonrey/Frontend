import React from 'react';
import styled from 'styled-components';
import {lightTheme, darkTheme} from '../../assets/styles/Colors';
import Item from './Checkbox';

const Container = styled.li`
  position: relative;
  height: 3.2rem;
  display: flex;
  align-items: center;
  background: ${props => props.darkTheme ? darkTheme["very-dark-blue"] : "white"};
  border-bottom: 0.1rem solid ${lightTheme["very-light-grayish-blue"]};
  
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
  
  svg {
    opacity: 0;
    transition: opacity 500ms;
  }
`

export default function TodoItem(props) {
  return (
    <Container>
      <Item todoText={props.todoText} />
      <CrossButton>
        <svg width="18" height="18">
          <path fill="#494C6B"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
        </svg>
      </CrossButton>
    </Container>
  );
}