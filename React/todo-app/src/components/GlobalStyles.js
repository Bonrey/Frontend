import {createGlobalStyle, css, keyframes} from 'styled-components';
import {lightTheme, darkTheme} from "../assets/styles/Colors";
import lightThemeDesktopBg from "../assets/images/bg-desktop-light.jpg";
import darkThemeDesktopBg from "../assets/images/bg-desktop-dark.jpg";
import lightThemeMobileBg from "../assets/images/bg-mobile-light.jpg";
import darkThemeMobileBg from "../assets/images/bg-mobile-dark.jpg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 18px;
    font-family: 'Josefin Sans', sans-serif;
    
    @media only screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  
  body {
    min-height: 100vh;
    background-color: ${props => props.darkTheme ? darkTheme["very-dark-blue"] : lightTheme["very-light-gray"]};
    animation: ${fadeIn} 1s 1;
    pointer-events: ${props => props.isDragging ? "none" : "auto"};
    transition: background-color 500ms;
    cursor: default!important;
    
    &:before, &:after {
      content: "";
      width: 100%;
      height: 300px;
      transition: opacity 500ms;
      z-index: -1;
      position: fixed;
      top: 0;
      
      @media only screen and (max-width: 375px) {
        height: 200px;
      }
    }
    
    &:before {
      background: url(${lightThemeDesktopBg}) no-repeat center;
      background-size: cover;
      
      @media only screen and (max-width: 375px) {
        background: url(${lightThemeMobileBg}) no-repeat center;
      }
    }
    
    &:after {
      background: url(${darkThemeDesktopBg}) no-repeat center;
      background-size: cover;
      
      @media only screen and (max-width: 375px) {
        background: url(${darkThemeMobileBg}) no-repeat center;
      }
    }
    
    ${props => props.darkTheme ? css`
      &:before { opacity: 0; }
      &:after { opacity: 1; }
    ` : css`
      &:before { opacity: 1; }
      &:after { opacity: 0; }
    `}
  }
`

export default GlobalStyles;