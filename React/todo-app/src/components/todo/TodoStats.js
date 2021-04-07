import React from "react";
import styled from 'styled-components';

import {primary, lightTheme, darkTheme} from '../../assets/styles/Colors';

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  height: 2.4rem;
  padding: 0 1.2rem;
  position: relative;
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue-hover"] : lightTheme["dark-grayish-blue"]};
  background: ${props => props.darkTheme ? darkTheme["very-dark-blue"] : "white"}
`

const SelectedOptionContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const Option = styled.label`
  font-weight: bold;
  margin: 0 0.4rem;
  cursor: pointer;
  
  > [type="radio"] {
    appearance: none;
  }
  
  > span {
    transition: 500ms;
  }
  
  &:hover span {
    color: ${lightTheme["very-dark-grayish-blue"]};
  }
  
  [type="radio"]:checked + span {
    color: ${primary["bright-blue"]};
  }
`

const ClearCompleted = styled.a`
  cursor: pointer;
  transition: 500ms;
  
  &:hover {
    color: ${lightTheme["very-dark-grayish-blue"]};
  }
`

export default function TodoStats(props) {
  let options = [], labels = ["all", "active", "completed"];
  for (let i = 0; i < 3; i++) {
    options.push(
      <Option key={labels[i]}>
        <input type="radio" name="stats-switch" checked={props.filter === labels[i]}
               onChange={_ => props.onChange(labels[i])} />
        <span>{labels[i].charAt(0).toUpperCase() + labels[i].slice(1)}</span>
      </Option>
    );
  }

  return (
    <StatsContainer>
      <span>{props.leftNumber} items left</span>
      <SelectedOptionContainer>{options}</SelectedOptionContainer>
      <ClearCompleted onClick={props.onClick}>Clear Completed</ClearCompleted>
    </StatsContainer>
  );
}