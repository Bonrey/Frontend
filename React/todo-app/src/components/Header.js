import React from "react";
import styled from 'styled-components';
import iconMoon from '../assets/images/icon-moon.svg';
import iconSun from '../assets/images/icon-sun.svg';

const Container = styled.header`
  margin: 4rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 2rem;
  letter-spacing: 1rem;
  color: white;
  text-transform: uppercase;
  user-select: none;
`

const ThemeButton = styled.input`
  display: block;
  width: 1.8rem;
  height: 1.8rem;
  appearance: none;
  outline: none;
  cursor: pointer;
  background: url(${iconMoon}) no-repeat center;
  
  &:checked {
    background: url(${iconSun}) no-repeat center;
  }
`

export default function Header({ darkTheme }) {
  return (
    <Container>
      <Logo>Todo</Logo>
      <ThemeButton type="checkbox" />
    </Container>
  );
}
