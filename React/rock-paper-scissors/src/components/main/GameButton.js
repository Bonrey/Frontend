import React from 'react';
import styled from 'styled-components';
import {motion} from "framer-motion";

import colors from "../../styles/colors";
import {buttonIcons} from "../../assets/icons";

const btnParams = {
  initial: {
    size: { width: 9, height: 9, shadow: 0.4 },
    coordinates: {
      paper: [6.5, 2.5],
      scissors: [20.5, 2.5],
      rock: [13.5, 13.62]
    }
  },
  play: {
    size: { width: 12, height: 12, shadow: 0.54 },
    coordinates: [3, 4]
  }
};

const ButtonContainer = styled(motion.button).attrs(({ play }) => ({
  gameState: play ? "play" : "initial",
  type: "button"
}))`
  border: none;
  outline: none;
  position: absolute;
  width: ${({ gameState }) => btnParams[gameState].size.width}rem;
  height: ${({ gameState }) => btnParams[gameState].size.height}rem;
  left: ${({ play, btnName }) => {
  if (play) return btnParams.play.coordinates[0];
  else return btnParams.initial.coordinates[btnName][0]
}}rem;
  top: ${({ play, btnName }) => {
  if (play) return btnParams.play.coordinates[1];
  else return btnParams.initial.coordinates[btnName][1]
}}rem;
  border-radius: 50%;
  cursor: pointer;
`

const ButtonBorder = styled.span.attrs(({ play }) => ({
  gameState: play ? "play" : "initial"
}))`
  background: ${({ btnName }) => colors[btnName]};
  box-shadow: inset 0 -${({ gameState }) => btnParams[gameState].size.shadow}rem ${({ btnName }) => colors[`${btnName}-shadow`]};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const ButtonImage = styled.span.attrs(({ play }) => ({
  gameState: play ? "play" : "initial"
}))`
  width: 76%;
  height: 76%;
  border-radius: 50%;
  background: #eee url(${({ btnName }) => buttonIcons[btnName]}) no-repeat center;
  background-size: 45%;
  box-shadow: inset 0 ${({ gameState }) => btnParams[gameState].size.shadow}rem hsla(229, 25%, 31%, 0.15);
  position: absolute;
  left: 12%;
  top: 12%;
`

const button = {
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 },
};

const GameButton = ({ play = false, player = "user", btnName, onClick }) => {
  return (
    <ButtonContainer
      play={play}
      btnName={btnName}
      player={player}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      variants={button}
      whileHover="hover"
      whileTap="pressed"
      onClick={onClick}
    >
      <ButtonBorder play={play} btnName={btnName} />
      <ButtonImage play={play} btnName={btnName} />
    </ButtonContainer>
  );
}

export default GameButton;