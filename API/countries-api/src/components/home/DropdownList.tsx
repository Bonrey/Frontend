import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import colors from '../../assets/styles/colors';
import leftArrow from '../../assets/icons/left-arrow.svg';
import clear from '../../assets/icons/clear.svg';

const Details = styled.div`
  background-color: ${colors.light.elements};
  font-weight: 600;
  font-size: 1.1rem;
  width: 13rem;
  height: 3.8rem;
  outline: none;
  border: 0.1rem dashed transparent;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem hsla(0, 0%, 52%, 0.15),
              0 0 0.2rem hsla(0, 0%, 52%, 0.15),
              0 0 0.3rem hsla(0, 0%, 52%, 0.15);

  &:focus-visible {
    border-color: ${colors.light.text};
  }
`

const Summary = styled(motion.header)`
  position: relative;
  list-style: none;
  line-height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`

const SummaryText = styled.span<{ shifted: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: ${({ shifted }) => shifted ? "1.2rem" : 0};
  cursor: pointer;
`

const ClearFilterButton = styled(motion.img)`
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  left: 1.1rem;
  top: 50%;
  cursor: pointer;
`

const CountriesList = styled(motion.ul)`
  background-color: ${colors.light.elements};
  height: 14rem;
  position: relative;
  top: 0.6rem;
  z-index: 1;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem hsla(0, 0%, 52%, 0.2),
              0 0 0.2rem hsla(0, 0%, 52%, 0.2),
              0 0 0.3rem hsla(0, 0%, 52%, 0.2);
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
    cursor: pointer;
    
    &:hover {
      background-color: hsl(0, 0%, 96%);
    }

    &:focus-visible {
      outline: 0.1rem dashed ${colors.light.text};
    }
  }
`

type Props = {
  isExpanded: boolean,
  onClick(region?: string): void,
  clearFilters(): void,
  summary: string
}

const regions = ["Africa", "Asia", "America", "Europe", "Oceania"];

const keydownSummaryText = (e: KeyboardEvent) => {
  if (e.code === "Enter") {
    document.getElementById("summaryText")?.click();
  }
}

const DropdownList: React.FC<Props> = ({ isExpanded, onClick, clearFilters, summary }) => {
  return (
    <Details
      id="dropdownList"
      tabIndex={0}
      onFocus={_ => document.addEventListener('keydown', keydownSummaryText, true)}
      onBlur={_ => document.removeEventListener('keydown', keydownSummaryText, true)}
    >
      <Summary>
        {summary !== "Filter by Region" &&
          <ClearFilterButton
            src={clear}
            alt="remove filter icon"
            initial={{ y: "-50%" }}
            whileHover={{ scale: 1.1 }}
            onClick={_ => clearFilters()}
          />
        }
        <SummaryText
          id="summaryText"
          shifted={summary !== "Filter by Region"}
          onClick={_ => onClick()}
        >
          {summary}
        </SummaryText>
        <motion.img
          style={{ width: "0.6rem", height: "0.6rem" }}
          src={leftArrow}
          alt="arrow icon"
          animate={isExpanded ? { rotate: -90 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        />
      </Summary>
      <AnimatePresence>
        {isExpanded && <CountriesList
          key="countries-list"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "14rem" },
            collapsed: { opacity: 1, height: 0 }
          }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <ListItems
            style={{ originX: "1rem", originY: "1rem" }}
            variants={{
              open: { scale: 1, opacity: 1 },
              collapsed: { scale: 0, opacity: 0 }
            }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {regions.map(region =>
              <li
                key={region}
                tabIndex={0}
                onClick={_ => onClick(region)}
                onKeyDown={e => { if (e.code === "Enter") onClick(region); }}
              >
                {region}
              </li>
            )}
          </ListItems>
        </CountriesList>}
      </AnimatePresence>
    </Details>
  );
}

export default DropdownList;