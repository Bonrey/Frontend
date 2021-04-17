import React from "react";
import styled from "styled-components";

const AttributionBox = styled.footer`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  color: black;
  font-size: 0.9rem;
  transition: color 500ms;
  
  span:first-child {
    margin-right: 0.4rem;
  }
`

const Link = styled.a`
  text-decoration: none;
  transition: color 500ms;
  color: black;
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
  }
  
  &:hover:after {
    transform: scaleX(1);
  }
`

export default function Attribution() {
  return (
    <AttributionBox>
      <span>
        Challenge by <Link href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </Link>.
      </span>
      <span>
        Coded by <Link
        href="https://github.com/Bonrey/Frontend/tree/main/React/todo-app"
        target="_blank">
          Bonrey
        </Link>.
      </span>
    </AttributionBox>
  );
}
