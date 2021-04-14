import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";
import logo from '../assets/images/logo.svg';

const HeaderWrapper = styled.div`
  width: 100%;
  flex-basis: 28%;
  border: 0.2rem solid ${colors["header-outline"]};
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 0 1.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.img`
  height: 75%;
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
  
  > span:first-child {
    color: ${colors["score-text"]};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    display: inline-block;
  }
  
  > span:last-child {
    color: ${colors["dark-text"]};
    font-size: 3.6rem;
    vertical-align: bottom;
    line-height: 3.5rem;
    font-weight: bold;
  }
`

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    };
  }

  render() {
    return (
      <HeaderWrapper>
        <Logo src={logo} alt="site logo" />
        <ScoreBoard>
          <span>Score</span>
          <span>{this.state.score}</span>
        </ScoreBoard>
      </HeaderWrapper>
    );
  }
}