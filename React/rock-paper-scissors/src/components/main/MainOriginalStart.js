import React from 'react';
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

const MainOriginalStart = ({ onClick }) => {
  return (
    <GameButtons>
      <GameButton btnName="paper" onClick={_ => onClick("paper")} />
      <GameButton btnName="scissors" onClick={_ => onClick("scissors")} />
      <GameButton btnName="rock" onClick={_ => onClick("rock")} />
    </GameButtons>
  );
}

export default MainOriginalStart;