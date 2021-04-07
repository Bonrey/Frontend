import React from "react";
import styled from 'styled-components';

const Container = styled.header`
  padding: 4rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 2rem;
  letter-spacing: 1rem;
  color: white;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
`

const ThemeButtonContainer = styled.label`
  width: 1.6rem;
  height: 1.6rem;
  display: block;
`

const ThemeButton = styled.input`
  position: absolute;
  appearance: none;
  outline: none;
  
  & + span {
    width: 1.8rem;
    height: 1.8rem;
    position: relative;
    cursor: pointer;
    
    .icon-sun, .icon-moon {
      transition-duration: 300ms;
      position: absolute;
    }
  }
  
  &:not(:checked) {
    + span .icon-sun {
      transition-delay: 0s;
      opacity: 0;
    }
    
    + span .icon-moon {
      transition-delay: 300ms;
      opacity: 1;
    }
  }
  
  &:checked {
    + span .icon-sun {
      transition-delay: 300ms;
      opacity: 1;
    }
    
    + span .icon-moon {
      transition-delay: 0s;
      opacity: 0;
    }
  }
`

export default function Header({ darkTheme }) {
  return (
    <Container>
      <Logo onClick={_ => window.location.reload()}>Todo</Logo>
      <ThemeButtonContainer>
        <ThemeButton type="checkbox" />
        <span>
          <svg className="icon-moon" width="26" height="26">
            <path fill="#FFF"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
          </svg>
          <svg className="icon-sun" width="26" height="26">
            <path fill="#FFF"
                  d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
          </svg>
        </span>
      </ThemeButtonContainer>
    </Container>
  );
}
