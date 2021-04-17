import React, {useEffect} from 'react';
import styled from "styled-components";
import bgTriangleDesktop from "../../assets/images/bg-triangle-desktop.svg";
import bgTriangleMobile from "../../assets/images/bg-triangle-mobile.svg";
import GameButton from "./GameButton";

const GameButtons = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: url(${bgTriangleDesktop}) no-repeat center 7rem / 14rem auto;
  
  @media only screen and (max-width: 1000px) {
    background: url(${bgTriangleMobile}) no-repeat center 7rem / 9rem auto;
  }
`


const MainOriginalStart = ({ onClick, rulesPopup }) => {
  useEffect(() => {
    const playButtons = [
      document.querySelector(".paper"),
      document.querySelector(".scissors"),
      document.querySelector(".rock"),
    ];

    const handleKeyDown = event => {
      const code = event.keyCode;
      if (code >= 49 && code <= 51 && !rulesPopup) {
        playButtons[code - 49].click();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <GameButtons>
      <GameButton btnName="paper" ariaLabel="paper" onClick={_ => onClick("paper")} />
      <GameButton btnName="scissors" ariaLabel="scissors" onClick={_ => onClick("scissors")} />
      <GameButton btnName="rock" ariaLabel="rock" onClick={_ => onClick("rock")} />
    </GameButtons>
  );
}

export default MainOriginalStart;