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
  padding: 0 5vw;
  box-sizing: border-box;
  box-shadow: 0 0.1rem 0.1rem hsl(0, 0%, 52%, 0.1),
              0 0.2rem 0.2rem hsl(0, 0%, 52%, 0.1),
              0 0.3rem 0.3rem hsl(0, 0%, 52%, 0.1);
`

const Heading = styled.h1`
  color: ${colors.light.text};
  font-weight: 800;
  font-size: 1.8rem;
`

const ThemeButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.light.text};
  font-weight: 600;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
`

const Header = () => {
  return (
    <Container>
      <Heading>Where in the world?</Heading>
      <ThemeButton type={"button"}>
        <FontAwesomeIcon icon={faMoon} />
        <span style={{marginLeft: "0.8rem"}}>Dark Mode</span>
      </ThemeButton>
    </Container>
  );
}

export default Header;