import React, {useEffect} from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";

import MainOriginalStart from "./main/MainOriginalStart";
import MainOriginalPlay from "./main/MainOriginalPlay";

const MainWrapper = styled.main`
  flex-basis: 72%;

  @media only screen and (max-width: 1000px) {
    flex-basis: 86%;
  }
`

const RulesButton = styled.button`
  outline: none;
  border: 0.15rem solid ${colors["header-outline"]};
  border-radius: 0.5rem;
  background-color: transparent;
  color: white;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 7rem;
  height: 2.5rem;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: background-color 200ms;
  z-index: 1;
  
  &:hover {
    background-color: ${colors["header-outline"]};
  }
  
  @media only screen and (max-width: 1000px) {
    right: 50%;
    transform: translateX(50%);
  }
`

const Main = (props) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (!props.rulesPopup) {
        if (event.keyCode === 82) {
          document.getElementById("openRulesBtn").click();
        } else if (event.keyCode === 89) {
          document.getElementById("resetScoreBtn").click();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <MainWrapper>
      {!props.gameStarted ?
        <MainOriginalStart
          onClick={userBtnName => props.onClick(true, userBtnName)}
          rulesPopup={props.rulesPopup}
        /> :
        <MainOriginalPlay
          userBtnName={props.userBtnName}
          computerBtnName={props.computerBtnName}
          onClick={_ => props.onClick(false)}
          gameResult={props.gameResult}
          rulesPopup={props.rulesPopup}
        />
      }
      <RulesButton id="openRulesBtn" onClick={props.onRulesClick} aria-label="rules-button">
        Rules
      </RulesButton>
    </MainWrapper>
  );
}

export default Main;