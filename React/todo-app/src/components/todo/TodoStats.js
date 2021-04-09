import React, {useState, useEffect} from "react";
import styled from 'styled-components';

import {primary, lightTheme, darkTheme} from '../../assets/styles/Colors';

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  height: 3.2rem;
  padding: 0 1.2rem;
  position: relative;
  transition: background-color 500ms;
  color: ${props => props.darkTheme ? darkTheme["dark-grayish-blue"] : lightTheme["dark-grayish-blue"]};
  background-color: ${props => props.darkTheme ? darkTheme["very-dark-desaturated-blue"] : "white"};
`

const ItemsLeftLabel = styled.span`
  transition: color 500ms;
`

const OptionsDesktop = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const OptionsMobile = styled.div`
  position: absolute;
  bottom: 6rem;
  height: 3.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 500ms;
  border-radius: 0.4rem;
  color: ${props => props.darkTheme ? darkTheme["dark-grayish-blue"] : lightTheme["dark-grayish-blue"]};
  background-color: ${props => props.darkTheme ? darkTheme["very-dark-desaturated-blue"] : "white"};
  box-shadow: 0 0 0.1rem hsla(235, 19%, 35%, 0.15),
              0 0 0.2rem hsla(235, 19%, 35%, 0.15),
              0 0 0.4rem hsla(235, 19%, 35%, 0.15);
  
  > label {
    margin: 0 0.8rem;
  }
`

const Option = styled.label`
  font-weight: bold;
  margin: 0 0.4rem;
  cursor: pointer;
  
  > [type="radio"] {
    appearance: none;
  }
  
  > span {
    transition: color 500ms;
  }
  
  &:hover span {
    color: ${props => props.darkTheme ?
      darkTheme["light-grayish-blue-hover"] :
      lightTheme["very-dark-grayish-blue"]};
  }
  
  [type="radio"]:checked + span {
    color: ${primary["bright-blue"]};
  }
`

const ClearCompleted = styled.a`
  cursor: pointer;
  transition: color 500ms;
  
  &:hover {
    color: ${props => props.darkTheme ?
  darkTheme["light-grayish-blue-hover"] :
  lightTheme["very-dark-grayish-blue"]};
  }
`

export default function TodoStats(props) {
  let options = [], labels = ["all", "active", "completed"];
  for (let i = 0; i < 3; i++) {
    options.push(
      <Option key={labels[i]} darkTheme={props.darkTheme}>
        <input type="radio" name="stats-switch" checked={props.filter === labels[i]}
               onChange={_ => props.onChange(labels[i])} />
        <span>{labels[i].charAt(0).toUpperCase() + labels[i].slice(1)}</span>
      </Option>
    );
  }

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  useEffect(_ => {
    const handleResize = _ => setWindowWidth(window.outerWidth);
    window.addEventListener("resize", handleResize);
    return _ => window.removeEventListener("resize", handleResize);
  });

  return (
    <div>
      <StatsContainer darkTheme={props.darkTheme}>
        <ItemsLeftLabel>{props.leftNumber} items left</ItemsLeftLabel>
        {windowWidth > 600 && <OptionsDesktop darkTheme={props.darkTheme}>
          {options}
        </OptionsDesktop>}
        <ClearCompleted onClick={props.onClick} darkTheme={props.darkTheme}>
          Clear Completed
        </ClearCompleted>
      </StatsContainer>
      {windowWidth <= 600 && <OptionsMobile darkTheme={props.darkTheme}>
        {options}
      </OptionsMobile>}
    </div>
  );
}