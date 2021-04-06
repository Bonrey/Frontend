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

const ItemsLeft = styled.span`

`

const SelectedOptionContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const SelectedOption = styled.a`
  font-weight: bold;
  cursor: pointer;
  margin: 0 0.4rem;
  transition: 500ms;
  
  &:hover {
    color: ${lightTheme["very-dark-grayish-blue"]};
  }
  
  &:active {
    color: ${primary["bright-blue"]};
  }
`

const ClearCompleted = styled(SelectedOption)`
  font-weight: normal;
  margin: 0;
`

export default function TodoStats() {
  return (
    <StatsContainer>
      <ItemsLeft>5 items left</ItemsLeft>
      <SelectedOptionContainer>
        <SelectedOption>All</SelectedOption>
        <SelectedOption>Active</SelectedOption>
        <SelectedOption>Completed</SelectedOption>
      </SelectedOptionContainer>
      <ClearCompleted>Clear Completed</ClearCompleted>
    </StatsContainer>
  );
}