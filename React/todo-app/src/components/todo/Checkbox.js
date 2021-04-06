import React from 'react';
import styled from 'styled-components';
import {primary, lightTheme, darkTheme} from '../../assets/styles/Colors';
import iconCheck from '../../assets/images/icon-check.svg';

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  
  &:hover input::after {
    box-shadow: 0 0 0 0.1rem transparent;
  }
`

const Checkbox = styled.input`
  width: 1.38rem;
  height: 1.38rem;
  margin: 0 1.2rem;
  appearance: none;
  outline: none;
  cursor: pointer;
  background: url(${iconCheck}) no-repeat center, ${primary["check-bg"]};
  border-radius: 50%;
  position: relative;
    
  &::after {
    content: "";
    width: 1.12rem;
    height: 1.12rem;
    position: absolute;
    left: 0.13rem;
    top: 0.13rem;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 0 0.14rem ${lightTheme["very-light-grayish-blue"]};
    transition: 600ms;
  }
    
  &:checked {
    &::after {
      box-shadow: 0 0 0 0.1rem transparent;
      background: transparent;
    }
    
    & + span {
      color: ${lightTheme["very-light-grayish-blue"]};
    
      &::before {
        transform: scaleX(1);
        background-color: ${lightTheme["very-light-grayish-blue"]};
      }
    }
  }
`

const TodoText = styled.span`
  position: relative;
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  transition: 600ms ease-out;
  padding-top: 0.2rem;
  line-height: 1.3rem;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.1rem;
    background-color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
    bottom: 0.6rem;
    left: 0;
    transform-origin: left;
    transform: scaleX(0);
    transition: 600ms ease-out;
  }
`


export default function Item(props) {
  return (
    <CheckboxContainer>
      <Checkbox type="checkbox" />
      <TodoText>{props.todoText}</TodoText>
    </CheckboxContainer>
  );
}