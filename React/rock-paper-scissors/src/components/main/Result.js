import React from 'react';
import styled from 'styled-components';
import {motion} from "framer-motion";

const Wrapper = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 9rem;
  z-index: 2;
  
  @media only screen and (max-width: 1000px) {
    top: 15.5rem;
  }
`

const Verdict = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 1000px) {
    font-size: 2.5rem;
    margin-bottom: 0.8rem;
  }
`

const PlayAgainBtn = styled(motion.button)`
  border: none;
  outline: none;
  border-radius: 0.4rem;
  width: 12rem;
  height: 2.6rem;
  text-transform: uppercase;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.08rem;
  cursor: pointer;
  color: ${({ userWon }) => userWon ? "hsl(229, 25%, 31%)" : "hsl(349, 61%, 52%)"};
  
  @media only screen and (max-width: 1000px) {
    width: 10rem;
  }
`

const Result = ({ userWon, onClick }) => {
  return (
    <Wrapper
      initial={{ translateX: "-50%", scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2 }}
    >
      <Verdict>You {userWon ? "win" : "lose"}</Verdict>
      <PlayAgainBtn
        id="playAgainBtn"
        type="button"
        userWon={userWon}
        whileHover={{ opacity: 0.9 }}
        whileTap={{ y: "-0.2rem" }}
        onClick={onClick}
        aria-label="play-again-button"
      >
        Play Again
      </PlayAgainBtn>
    </Wrapper>
  );
}

export default Result;