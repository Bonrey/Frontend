import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import TodoStats from "./TodoStats";

import {lightTheme} from "../../assets/styles/Colors";

const Container = styled.ul`
  border-radius: 0.4rem;
  overflow: hidden;
  filter: drop-shadow(0 0 1rem ${lightTheme["dark-grayish-blue"]});
`

export default function TodoList(props) {
  return (
    <Container>
      <TodoItem todoText={props.todoText} />
      <TodoStats />
    </Container>
  );
}