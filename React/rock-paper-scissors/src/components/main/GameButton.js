import React from 'react';
import styled from 'styled-components';
import {motion} from "framer-motion";

import colors from "../../styles/colors";
import {buttonIcons} from "../../assets/icons";

const coordinates = {
  paper: [11, 7],
  scissors: [25, 7],
  rock: [18, 18.12]
};

const ButtonBorder = styled.div`
  background: ${({ btnName }) => colors[btnName]};
  box-shadow: inset 0 -0.4rem ${({ btnName }) => colors[`${btnName}-shadow`]};
  position: absolute;
  left: ${({ btnName }) => coordinates[btnName][0]}rem;
  top: ${({ btnName }) => coordinates[btnName][1]}rem;
  transform: translate(-50%, -50%);
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
`

const Button = styled(motion.button)`
  border: none;
  outline: none;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: white url(${({ btnName }) => buttonIcons[btnName]}) no-repeat center;
  box-shadow: inset 0 0.35rem hsla(229, 25%, 31%, 0.15);
  position: absolute;
  left: 1rem;
  top: 1rem;
  cursor: pointer;
`

const GameButton = (props) => {
  return (
    <ButtonBorder btnName={props.btnName}>
      <Button
        btnName={props.btnName}
      />
    </ButtonBorder>
  );
}

export default GameButton;