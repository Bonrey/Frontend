import {createGlobalStyle} from 'styled-components';
import colors from './colors';

const globalStyle = createGlobalStyle<{ dark?: boolean }>`
  * {
    margin: 0;
    padding: 0;
  }
  
  html {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
  }
  
  body {
    min-height: 100vh;
    background-color: ${({dark}) => dark ? colors.dark.background : colors.light.background};
  }
`

export default globalStyle;