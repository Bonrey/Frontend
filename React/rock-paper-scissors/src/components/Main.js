import React from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";
import MainOriginalStart from "./main/MainOriginalStart";

const MainWrapper = styled.main`
  flex-basis: 72%;
`

const RulesButton = styled.button`
  outline: none;
  border: 0.15rem solid ${colors["header-outline"]};
  border-radius: 0.5rem;
  background-color: transparent;
  color: white;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 7rem;
  height: 2.5rem;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: 200ms;
  
  &:hover {
    background-color: ${colors["header-outline"]};
  }
`

export default function Main(props) {
  return (
    <MainWrapper>
      <MainOriginalStart />
      <RulesButton onClick={props.onRulesClick}>Rules</RulesButton>
    </MainWrapper>
  );
}