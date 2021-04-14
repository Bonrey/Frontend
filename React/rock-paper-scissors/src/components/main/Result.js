import React from 'react';
import styled from 'styled-components';
import {motion} from "framer-motion";

const Wrapper = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 9rem;
`

const Verdict = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
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
  color: ${({ computerWon }) => computerWon ? "hsl(349, 61%, 52%)" : "black"};
`

const Result = ({ computerWon, onClick }) => {
  return (
    <Wrapper
      initial={{ translateX: "-50%", scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2 }}
    >
      <Verdict>You {computerWon ? "lose" : "win"}</Verdict>
      <PlayAgainBtn
        type="button"
        computerWon={computerWon}
        whileHover={{ opacity: 0.9 }}
        whileTap={{ y: "-0.2rem" }}
        onClick={onClick}
      >
        Play Again
      </PlayAgainBtn>
    </Wrapper>
  );
}

export default Result;