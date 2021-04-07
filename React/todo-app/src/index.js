import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";

import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import Main from './components/Main';

const Wrapper = styled.div`
  width: 28rem;
  max-width: 90vw;
  height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: false
    };
  }

  render() {
    return (
      <Wrapper>
        <GlobalStyles />
        <Header darkTheme={this.state.darkTheme} />
        <Main />
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));