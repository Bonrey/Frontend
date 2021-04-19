import React from 'react';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

import colors from '../../assets/styles/colors';
import leftArrow from '../../assets/icons/left-arrow.svg';

const Details = styled.div`
  cursor: pointer;
  background-color: ${colors.light.elements};
  font-weight: 600;
  font-size: 1.1rem;
  width: 13rem;
  height: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem hsl(0, 0%, 52%, 0.1),
              0 0 0.2rem hsl(0, 0%, 52%, 0.1),
              0 0 0.3rem hsl(0, 0%, 52%, 0.1);
`

const Summary = styled(motion.header)`
  list-style: none;
  line-height: 4.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  
  > img {
    width: 0.6rem;
    height: 0.6rem;
  }
`

const CountriesList = styled(motion.ul)`
  background-color: ${colors.light.elements};
  height: 14rem;
  position: relative;
  z-index: 1;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem hsl(0, 0%, 52%, 0.1),
              0 0 0.2rem hsl(0, 0%, 52%, 0.1),
              0 0 0.3rem hsl(0, 0%, 52%, 0.1);
`

const ListItems = styled(motion.div)`
  height: 12rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  
  > li {
    flex-basis: 20%;
    list-style-type: none;
    transition: background-color 300ms;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    
    &:hover {
      background-color: hsl(0, 0%, 96%);
    }
  }
`

type Props = {
  isExpanded: boolean,
  onClick(region?: string): void,
  summary: string
}

const regions = ["Africa", "Asia", "America", "Europe", "Oceania"];

const DropdownList: React.FC<Props> = ({isExpanded, onClick, summary}) => {
  return (
    <Details>
      <Summary onClick={_ => onClick()}>
        <span>{summary}</span>
        <motion.img
          src={leftArrow}
          alt="arrow icon"
          animate={isExpanded ? {rotate: -90} : {rotate: 0}}
          transition={{duration: 0.5}}
        />
      </Summary>
      <AnimatePresence>
        {isExpanded && <CountriesList
          key="countries-list"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: {opacity: 1, height: "14rem"},
            collapsed: {opacity: 1, height: 0}
          }}
          transition={{type: "tween", duration: 0.5}}
        >
          <ListItems
            style={{originX: "1rem", originY: "1rem"}}
            variants={{
              open: {scale: 1, opacity: 1},
              collapsed: {scale: 0, opacity: 0}
            }}
            transition={{type: "tween", duration: 0.5}}
          >
            {regions.map(region =>
              <li key={region} onClick={_ => onClick(region)}>{region}</li>
            )}
          </ListItems>
        </CountriesList>}
      </AnimatePresence>
    </Details>
  );
}

export default DropdownList;