import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

import GameButton from "./GameButton";
import Result from "./Result";

const ButtonsWrapper = styled.div`
  padding-top: 3rem;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`

const Player = styled(motion.div)`
  flex-basis: 50%;
  position: relative;
  
  &:after {
    content: "";
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    position: absolute;
    left: 4.5rem;
    top: 5.5rem;
    background-color: hsl(214, 47%, 17%);
    z-index: -3;
    
    @media only screen and (max-width: 1000px) {
      width: 6rem;
      height: 6rem;
      left: 1.5rem;
      top: 1.5rem;
    }
  }
`

const PlayerLabel = styled.p`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.1rem;
  font-size: 1.2rem;
  color: white;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
  
  @media only screen and (max-width: 1000px) {
    font-size: 0.9rem;
    letter-spacing: 0.07rem;
    top: 9rem;
  }
`

const MainOriginalPlay = ({ userBtnName, computerBtnName, onClick, gameResult, rulesPopup }) => {
  const [visible, makeVisible] = useState(false);
  useEffect(_ => {
    const visibilityTimer = setTimeout(_ => makeVisible(true), 1000);
    return () => clearTimeout(visibilityTimer);
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.outerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  useEffect(() => {
    const handleKeyDown = event => {
      if ((event.keyCode === 13 || event.keyCode === 32) && visible && !rulesPopup) {
        document.getElementById("playAgainBtn").click();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <ButtonsWrapper>
      <Player transition={{ delay: 2 }} animate={windowWidth > 1000 ? { x: "-8rem" } : { x: 0 }}>
        <PlayerLabel>You Picked</PlayerLabel>
        <GameButton play btnName={userBtnName} winner={gameResult === 1} />
      </Player>
      <Result onClick={onClick} userWon={gameResult === 1} />
      <Player computer transition={{ delay: 2 }} animate={windowWidth > 1000 ? { x: "8rem" } : { x: 0 }}>
        <PlayerLabel>The House Picked</PlayerLabel>
        {visible && <GameButton play btnName={computerBtnName} winner={gameResult === -1} />}
      </Player>
    </ButtonsWrapper>
  );
}

export default MainOriginalPlay;