import {createGlobalStyle} from 'styled-components';
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Barlow Semi Condensed', sans-serif;
  }
  
  body {
    min-height: 100vh;
    background: ${colors["background"]};
  }
`

export default GlobalStyle;