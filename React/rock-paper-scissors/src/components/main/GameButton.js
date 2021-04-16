import React from 'react';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {Frame} from "framer";

import colors from "../../styles/colors";
import {buttonIcons} from "../../assets/icons";

const btnParamsDesktop = {
  initial: {
    size: { width: 9, height: 9, shadow: 0.4 },
    coordinates: {
      paper: [7.5, 2.5],
      scissors: [21.5, 2.5],
      rock: [14.5, 13.62]
    }
  },
  play: {
    size: { width: 12, height: 12, shadow: 0.54 },
    coordinates: [3.5, 4]
  }
};

const btnParamsMobile = {
  initial: {
    size: { width: 7, height: 7, shadow: 0.33 },
    coordinates: {
      paper: [1, 3.5],
      scissors: [10, 3.5],
      rock: [5.5, 11.29]
    }
  },
  play: {
    size: { width: 7, height: 7, shadow: 0.33 },
    coordinates: [1, 1]
  }
}

const ButtonContainer = styled(motion.button).attrs(({ play }) => ({
  gameState: play ? "play" : "initial",
  type: "button"
}))`
  border: none;
  outline: none;
  position: absolute;
  width: ${({ gameState }) => btnParamsDesktop[gameState].size.width}rem;
  height: ${({ gameState }) => btnParamsDesktop[gameState].size.height}rem;
  left: ${({ play, btnName }) => {
  if (play) return btnParamsDesktop.play.coordinates[0];
  else return btnParamsDesktop.initial.coordinates[btnName][0]
}}rem;
  top: ${({ play, btnName }) => {
  if (play) return btnParamsDesktop.play.coordinates[1];
  else return btnParamsDesktop.initial.coordinates[btnName][1]
}}rem;
  border-radius: 50%;
  cursor: pointer;
  
  @media only screen and (max-width: 1000px) {
    width: ${({ gameState }) => btnParamsMobile[gameState].size.width}rem;
    height: ${({ gameState }) => btnParamsMobile[gameState].size.height}rem;
    left: ${({ play, btnName }) => {
  if (play) return btnParamsMobile.play.coordinates[0];
  else return btnParamsMobile.initial.coordinates[btnName][0]
}}rem;
    top: ${({ play, btnName }) => {
  if (play) return btnParamsMobile.play.coordinates[1];
  else return btnParamsMobile.initial.coordinates[btnName][1]
}}rem;
  }
`

const ButtonBorder = styled.span.attrs(({ play }) => ({
  gameState: play ? "play" : "initial"
}))`
  background: ${({ btnName }) => colors[btnName]};
  box-shadow: inset 0 -${({ gameState }) => btnParamsDesktop[gameState].size.shadow}rem ${({ btnName }) => colors[`${btnName}-shadow`]};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  
  @media only screen and (max-width: 1000px) {
    box-shadow: inset 0 -${({ gameState }) => btnParamsMobile[gameState].size.shadow}rem ${({ btnName }) => colors[`${btnName}-shadow`]};
  }
`

const ButtonImage = styled.span.attrs(({ play }) => ({
  gameState: play ? "play" : "initial"
}))`
  width: 76%;
  height: 76%;
  border-radius: 50%;
  background: #eee url(${({ btnName }) => buttonIcons[btnName]}) no-repeat center;
  background-size: 45%;
  box-shadow: inset 0 ${({ gameState }) => btnParamsDesktop[gameState].size.shadow}rem hsla(229, 25%, 31%, 0.15);
  position: absolute;
  left: 12%;
  top: 12%;
  z-index: 1;
  
  @media only screen and (max-width: 1000px) {
    box-shadow: inset 0 ${({ gameState }) => btnParamsMobile[gameState].size.shadow}rem hsla(229, 25%, 31%, 0.15);
  }
`

const button = {
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 },
};

const GameButton = ({ play = false, player = "user", btnName, onClick, winner, windowWidth }) => {
  return (
    <ButtonContainer
      play={play}
      btnName={btnName}
      player={player}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      variants={!play ? button : ""}
      whileHover="hover"
      whileTap="pressed"
      onClick={onClick}
    >
      {play && winner && <>
        <Frame
          size={windowWidth <= 1000 ? "7rem" : "12rem"}
          radius={"50%"}
          center
          backgroundColor={"rgb(38, 53, 83)"}
          animate={{ scale: [1.96, 2.6, 2.6, 2.6], opacity: [0, 0.3, 0.3, 0] }}
          transition={{ repeat: Infinity, delay: 2, times: [0.2, 0.45, 0.75, 1], duration: 2 }}
        />
        <Frame
          size={windowWidth <= 1000 ? "7rem" : "12rem"}
          radius={"50%"}
          center
          backgroundColor={"rgb(38, 53, 83)"}
          animate={{ scale: [1.4, 1.96, 1.96, 1.96], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ repeat: Infinity, delay: 2, times: [0.1, 0.35, 0.75, 1], duration: 2 }}
        />
        <Frame
          size={windowWidth <= 1000 ? "7rem" : "12rem"}
          radius={"50%"}
          center
          backgroundColor={"rgb(38, 53, 83)"}
          animate={{ scale: [1, 1.4, 1.4, 1.4], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ repeat: Infinity, delay: 2, times: [0, 0.25, 0.75, 1], duration: 2 }}
        />
      </>}
      <ButtonBorder play={play} btnName={btnName} />
      <ButtonImage play={play} btnName={btnName} />
    </ButtonContainer>
  );
}

export default GameButton;