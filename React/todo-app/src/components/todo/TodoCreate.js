import React from 'react';
import styled from 'styled-components';

import {lightTheme, darkTheme} from '../../assets/styles/Colors';

const Container = styled.form`
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
  padding: 0.2rem 1.2rem;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  line-height: 3.4rem;
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  
  &::placeholder {
    color: ${props => props.darkTheme ? darkTheme["light-grayish-blue-hover"] : lightTheme["dark-grayish-blue"]};
  }
`

export default class TodoCreate extends React.Component {
  render() {
    return (
      <Container onSubmit={this.props.onSubmit}>
        <TextField
          type="text"
          value={this.props.value}
          placeholder="Create a new todo..."
          aria-label="Create a new todo item"
          onChange={this.props.onChange}
        />
      </Container>
    );
  }
}