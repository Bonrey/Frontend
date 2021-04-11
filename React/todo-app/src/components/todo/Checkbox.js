import React from 'react';
import styled from 'styled-components';
import {primary, lightTheme, darkTheme} from '../../assets/styles/Colors';
import iconCheck from '../../assets/images/icon-check.svg';

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover input::after {
    box-shadow: 0 0 0 0.1rem transparent;
  }
`

const Checkbox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 1.2rem;
  appearance: none;
  outline: none;
  cursor: pointer;
  background: url(${iconCheck}) no-repeat center, ${primary["check-bg"]};
  background-size: 45%, cover;
  border-radius: 50%;
  position: relative;
    
  &::after {
    content: "";
    width: 1.1rem;
    height: 1.1rem;
    position: absolute;
    left: 0.1rem;
    top: 0.1rem;
    border-radius: 50%;
    background: ${props => props.darkTheme ? darkTheme["very-dark-desaturated-blue"] : "white"};
    box-shadow: 0 0 0 0.12rem ${props => props.darkTheme ?
      darkTheme["very-dark-grayish-blue-2"] :
      lightTheme["very-light-grayish-blue"]};
    transition: 500ms;
  }
    
  &:checked {
    &::after {
      box-shadow: 0 0 0 0.1rem transparent;
      background: transparent;
    }
    
    & + span {
      color: ${props => props.darkTheme ?
        darkTheme["very-dark-grayish-blue-1"] :
        lightTheme["very-light-grayish-blue"]};
    
      &::before {
        transform: scaleX(1);
        background-color: ${props => props.darkTheme ?
          darkTheme["very-dark-grayish-blue-1"] :
          lightTheme["very-light-grayish-blue"]};
      }
    }
  }
`

const TodoText = styled.span`
  position: relative;
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  transition: 500ms;
  padding-top: 0.2rem;
  line-height: 1.3rem;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${props => props.darkTheme ?
              darkTheme["light-grayish-blue"] :
              lightTheme["very-dark-grayish-blue"]};
    bottom: 0.6rem;
    left: 0;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 400ms, background-color 500ms;
  }
`

export default function Item(props) {
  return (
    <CheckboxContainer>
      <Checkbox
        type="checkbox"
        onChange={_ => props.onChange(props.id)}
        checked={props.completed}
        darkTheme={props.darkTheme}
        aria-hidden
      />
      <TodoText darkTheme={props.darkTheme}>{props.text}</TodoText>
    </CheckboxContainer>
  );
}