import React from 'react';
import ReactDOM from "react-dom";

import GlobalStyle from './components/GlobalStyle';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Main from './components/Main';

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
        <GlobalStyle />
        <Header darkTheme={this.state.darkTheme} />
        <Main />
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));