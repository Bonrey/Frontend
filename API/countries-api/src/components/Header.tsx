import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon} from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

import colors from '../assets/styles/colors';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.light.elements};
  height: 6rem;
  padding-left: 5vw;
  padding-right: calc(5vw - 1rem);
  box-sizing: border-box;
  box-shadow: 0 0.1rem 0.1rem hsla(0, 0%, 52%, 0.15),
              0 0.2rem 0.2rem hsla(0, 0%, 52%, 0.15);
`

const Heading = styled.h1`
  color: ${colors.light.text};
  font-weight: 800;
  font-size: 1.75rem;
  cursor: pointer;
`

const ThemeButton = styled.button`
  outline: none;
  border: none;
  padding: 0 1rem;
  line-height: 3.5rem;
  border-radius: 1rem;
  background-color: transparent;
  color: ${colors.light.text};
  font-weight: 600;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 300ms;
  
  &:hover {
    background-color: hsl(0, 0%, 96%);
  }

  &:focus {
    background-color: hsl(0, 0%, 96%);
  }
`

const Header = () => {
  return (
    <Container>
      <Heading onClick={_ => window.location.reload()}>Where in the world?</Heading>
      <ThemeButton type={"button"}>
        <FontAwesomeIcon icon={faMoon} />
        <span style={{marginLeft: "0.8rem"}}>Dark Mode</span>
      </ThemeButton>
    </Container>
  );
}

export default Header;