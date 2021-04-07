import {createGlobalStyle, keyframes} from 'styled-components';
import {lightTheme} from "../assets/styles/Colors";
import lightThemeBg from "../assets/images/bg-desktop-light.jpg";

const bodyFadeIn = keyframes`
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
  }
  
  body {
    min-height: 100vh;
    background: ${lightTheme["very-light-gray"]};
    animation: ${bodyFadeIn} 1s 1;
    
    &:before {
      content: "";
      width: 100%;
      height: 300px;
      background: url(${lightThemeBg}) no-repeat center;
      background-size: cover;
      z-index: -1;
      position: absolute;
      top: 0;
    }
  }
`

export default GlobalStyles;