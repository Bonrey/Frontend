import React from 'react';
import GlobalStyle from "./styles/globalStyle";
import Content from "./components/Content";

export default class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Content />
      </>
    );
  }
}
