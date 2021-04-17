import React from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";
import logo from '../assets/images/logo.svg';
import resetBtn from '../assets/images/update-arrow.svg';
import {motion} from "framer-motion";

const HeaderWrapper = styled(motion.header)`
  width: 100%;
  flex-basis: 28%;
  border: 0.2rem solid ${colors["header-outline"]};
  border-radius: 1rem;
  padding: 0 1.5rem;
  margin: 1rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media only screen and (max-width: 1000px) {
    flex-basis: 14%;
    margin-top: 1.5rem;
    border-radius: 0.4rem;
    padding: 0 1rem;
  }
`

const Logo = styled.img`
  height: 75%;
  
  @media only screen and (max-width: 1000px) {
    height: 60%;
  }
`

const ScoreBoard = styled.div`
  background-color: white;
  width: 8rem;
  height: 75%;
  border-radius: 0.5rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media only screen and (max-width: 1000px) {
    width: 30%;
    border-radius: 0.2rem;
  }
  
  .score-top-section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 1.2rem;
    
    @media only screen and (max-width: 1000px) {
      padding: 0 0.3rem;
    }
    
    img {
      margin-top: 0.1rem;
      width: 0.9rem;
      height: 0.9rem;
      
      &:hover {
        cursor: pointer;
      }
      
      @media only screen and (max-width: 1000px) {
        margin: 0;
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
  
  .score-label {
    color: ${colors["score-text"]};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    display: inline-block;
    
    @media only screen and (max-width: 1000px) {
      font-size: 0.7rem;
    }
  }
  
  .score {
    color: ${colors["dark-text"]};
    font-size: 3.4rem;
    height: 3.6rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    
    @media only screen and (max-width: 1000px) {
      font-size: 2rem;
      height: 2.4rem;
    }
  }
`

const Header = ({ userScore, computerScore, onClick }) => {
  return (
    <HeaderWrapper
      initial={{ y: "-50vh" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", delay: 1, duration: 1 }}
    >
      <Logo src={logo} alt="site logo" />
      <ScoreBoard>
        <div>
          <div className="score-top-section">
            <span className="score-label">Score</span>
            <motion.img
              id="resetScoreBtn"
              src={resetBtn}
              alt="reset btn"
              initial={{ rotate: 90 }}
              whileHover={{ rotate: 180 }}
              onClick={onClick}
            />
          </div>
          <p className="score">
            <span>{userScore}</span>
            <span style={{ paddingBottom: "0.5rem" }}>:</span>
            <span>{computerScore}</span>
          </p>
        </div>
      </ScoreBoard>
    </HeaderWrapper>
  );
}

export default Header;