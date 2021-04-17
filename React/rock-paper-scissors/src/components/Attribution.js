import React from "react";
import styled from "styled-components";

const AttributionBox = styled.footer`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  width: 12rem;
  line-height: 1.25rem;
  word-spacing: 0.05rem;
  text-align: center;
  color: rgb(240, 240, 240);
  font-size: 0.9rem;
  
  @media only screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    font-size: 0.8rem;
  }
`

const Link = styled.a`
  text-decoration: none;
  transition: color 400ms;
  color: rgba(240, 240, 240, 0.5);
  outline: none;
  
  &:hover {
    color: rgba(240, 240, 240, 1);
  }
`

export default function Attribution() {
  return (
    <AttributionBox>
      <p style={{marginRight: "0.4rem"}}>
        Challenge by <Link href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </Link>.
      </p>
      <p>
        Created by <Link
        href="https://github.com/Bonrey/Frontend/tree/main/React/rock-paper-scissors"
        target="_blank">
          Bonrey
        </Link>.
      </p>
    </AttributionBox>
  );
}
