import React from 'react';
import styled from 'styled-components';

import {primary, lightTheme, darkTheme} from '../../assets/styles/Colors';

const Container = styled.form`
  width: 100%;
  height: 3.6rem;
  margin-bottom: 1.5rem;
  border-radius: 0.4rem;
  overflow: hidden;
`

const TextField = styled.input`
  outline: none;
  border: none;
  font-size: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  padding: 0.2rem 1.5rem 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  line-height: 3.4rem;
  transition: background-color 500ms, color 500ms;
  caret-color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : primary["bright-blue"]};
  background: ${props => props.darkTheme ? darkTheme["very-dark-desaturated-blue"] : "white"};
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  
  &::placeholder {
    color: ${props => props.darkTheme ? darkTheme["dark-grayish-blue"] : lightTheme["dark-grayish-blue"]};
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
          darkTheme={this.props.darkTheme}
        />
        <input type="submit" hidden />
      </Container>
    );
  }
}