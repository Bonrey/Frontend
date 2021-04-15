import React from 'react';
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion"

import imageRules from "../assets/images/image-rules.svg";

const RulesPopup = styled(motion.div)`
  width: 22rem;
  height: 22rem;
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 0.6rem;
  z-index: 10;
  
  @media only screen and (max-width: 1000px) {
    width: 16rem;
    height: 16rem;
    padding-top: 1rem;
    border-radius: 0.4rem;
  }
`

const TopPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Heading = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  
  @media only screen and (max-width: 1000px) {
    font-size: 1.2rem;
    letter-spacing: 0.08rem;
  }
`

const CloseButton = styled(motion.button)`
  width: 1.2rem;
  height: 1.2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  opacity: 0.25;
  transition: opacity 200ms;
  
  @media only screen and (max-width: 1000px) {
    width: 1rem;
    height: 1rem;
  }
  
  &:hover {
    opacity: 1;
  }
`

const Image = styled.img`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  
  @media only screen and (max-width: 1000px) {
    width: 75%;
    height: auto;
  }
`

const popup = {
  initial: {
    translateX: "-50%",
    translateY: "-250%",
    opacity: 0
  },
  visible: {
    translateY: "-50%",
    opacity: 1
  },
  hidden: {
    translateY: "150%",
    opacity: 0
  }
}

const Rules = props => {
  return (
    <AnimatePresence>
      {props.rulesPopup &&
      <RulesPopup
        variants={popup}
        initial="initial"
        animate="visible"
        exit="hidden"
      >
        <TopPart>
          <Heading>Rules</Heading>
          <CloseButton onClick={props.onRulesClose}>
            <svg viewBox="0 0 20 20" width="100%" height="100%">
              <title>close</title>
              <path
                fill="#3B4262"
                d="M16.97 0l2.122 2.121-7.425 7.425 7.425 7.425-2.121 2.12-7.425-7.424-7.425 7.425L0 16.97l7.425-7.425L0 2.121 2.121 0l7.425 7.425L16.971 0z"
              />
            </svg>
          </CloseButton>
        </TopPart>
        <Image src={imageRules} alt="rules" />
      </RulesPopup>}
    </AnimatePresence>
  );
}

export default Rules;