import React from "react";
import styled from "styled-components";
import {darkTheme, lightTheme} from "../assets/styles/Colors";

const AttributionBox = styled.footer`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  color: ${props => props.darkTheme ? darkTheme["dark-grayish-blue"] : lightTheme["dark-grayish-blue"]};
  font-size: 0.9rem;
  transition: color 500ms;
  
  span:first-child {
    margin-right: 0.4rem;
  }
`

const Link = styled.a`
  text-decoration: none;
  transition: color 500ms;
  color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  outline: none;
  position: relative;
  
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 300ms ease-in-out;
    background-color: ${props => props.darkTheme ? darkTheme["light-grayish-blue"] : lightTheme["very-dark-grayish-blue"]};
  }
  
  &:hover:after {
    transform: scaleX(1);
  }
`

export default function Attribution({ darkTheme }) {
  return (
    <AttributionBox darkTheme={darkTheme}>
      <span>
        Challenge by <Link
          darkTheme={darkTheme}
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank">
          Frontend Mentor
        </Link>.
      </span>
      <span>
        Coded by <Link
          darkTheme={darkTheme}
          href="https://github.com/Bonrey/Frontend/tree/main/React/todo-app"
          target="_blank">
          Bonrey
        </Link>.
      </span>
    </AttributionBox>
  );
}