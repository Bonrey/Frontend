import React from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";
import logo from '../assets/images/logo.svg';

const HeaderWrapper = styled.header`
  width: 100%;
  flex-basis: 28%;
  border: 0.2rem solid ${colors["header-outline"]};
  border-radius: 1rem;
  padding: 0 1.5rem;
  margin: 1rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media only screen and (max-width: 1000px) {
    flex-basis: 14%;
    margin-top: 1.5rem;
    border-radius: 0.4rem;
    padding: 0 1rem;
  }
`

const Logo = styled.img`
  height: 75%;
  
  @media only screen and (max-width: 1000px) {
    height: 60%;
  }
`

const ScoreBoard = styled.div`
  background-color: white;
  width: 8rem;
  height: 75%;
  border-radius: 0.5rem;
  padding: 0.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media only screen and (max-width: 1000px) {
    width: 30%;
    border-radius: 0.2rem;
  }
  
  > span:first-child {
    color: ${colors["score-text"]};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    display: inline-block;
    
    @media only screen and (max-width: 1000px) {
      font-size: 0.8rem;
    }
  }
  
  > span:last-child {
    color: ${colors["dark-text"]};
    font-size: 3.6rem;
    vertical-align: bottom;
    line-height: 3.5rem;
    font-weight: bold;
    
    @media only screen and (max-width: 1000px) {
      font-size: 2.6rem;
      line-height: 2.4rem;
    }
  }
`

const Header = ({ score }) => {
  return (
    <HeaderWrapper>
      <Logo src={logo} alt="site logo" />
      <ScoreBoard>
        <span>Score</span>
        <span>{score}</span>
      </ScoreBoard>
    </HeaderWrapper>
  );
}

export default Header;