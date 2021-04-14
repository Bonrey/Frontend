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
    z-index: -1;
  }
`

const Heading = styled.h2`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.1rem;
  font-size: 1.2rem;
  color: white;
`

const MainOriginalPlay = ({ userBtnName, computerBtnName, onClick }) => {
  const [visible, makeVisible] = useState(false);
  useEffect(_ => {
    setTimeout(_ => makeVisible(true), 1000);
  });

  return (
    <ButtonsWrapper>
      <Player animate={{ x: "-8rem" }} transition={{ delay: 2 }}>
        <Heading>You Picked</Heading>
        <GameButton play btnName={userBtnName} />
      </Player>
      <Result onClick={onClick} />
      <Player computer animate={{ x: "8rem" }} transition={{ delay: 2 }}>
        <Heading>The House Picked</Heading>
        {visible && <GameButton btnName={computerBtnName} play />}
      </Player>
    </ButtonsWrapper>
  );
}

export default MainOriginalPlay;