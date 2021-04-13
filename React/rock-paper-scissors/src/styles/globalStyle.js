import {createGlobalStyle} from 'styled-components';
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 18px;
  }
  
  body {
    background: ${colors["background"]} no-repeat;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default GlobalStyle;