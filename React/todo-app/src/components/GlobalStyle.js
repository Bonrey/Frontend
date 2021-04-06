import {createGlobalStyle} from 'styled-components';
import {lightTheme} from "../assets/styles/Colors";
import lightThemeBg from "../assets/images/bg-desktop-light.jpg";

const GlobalStyle = createGlobalStyle`
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
    height: 100vh;
    background: ${lightTheme["very-light-gray"]};
    
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

export default GlobalStyle;