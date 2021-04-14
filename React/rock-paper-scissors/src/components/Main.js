import React from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";

import MainOriginalStart from "./main/MainOriginalStart";
import MainOriginalPlay from "./main/MainOriginalPlay";

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

const Main = ({ gameStarted, userBtnName, computerBtnName, onClick, onRulesClick }) => {
  return (
    <main style={{ flexBasis: "72%" }}>
      {!gameStarted ?
        <MainOriginalStart onClick={userBtnName => onClick(true, userBtnName)} /> :
        <MainOriginalPlay
          userBtnName={userBtnName}
          computerBtnName={computerBtnName}
          onClick={_ => onClick(false)}
        />
      }
      <RulesButton onClick={onRulesClick}>Rules</RulesButton>
    </main>
  );
}

export default Main;