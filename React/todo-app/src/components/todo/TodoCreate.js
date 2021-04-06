import React from 'react';
import styled from 'styled-components';

import {lightTheme, darkTheme} from '../../assets/styles/Colors';

const Container = styled.div`
  height: 3.4rem;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  overflow: hidden;
  background: ${props => props.darkTheme ? darkTheme["very-dark-blue"] : "white"}
`

const TextField = styled.input`
  outline: none;
  border: none;
  font-size: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  padding: 0 1.2rem;
  width: 100%;
  line-height: 3.4rem;
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  
  &::placeholder {
    color: ${props => props.darkTheme ? darkTheme["light-grayish-blue-hover"] : lightTheme["dark-grayish-blue"]};
  }
`

export default function TodoCreate() {
  return (
    <Container>
      <TextField
        type="text"
        placeholder="Create a new todo..."
        aria-label="Create a new todo"
        maxLength="40"
      />
    </Container>
  );
}