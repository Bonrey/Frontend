import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";

import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import Main from './components/Main';
import Attribution from "./components/Attribution";

const Wrapper = styled.div`
  position: relative;
  width: 30rem;
  max-width: 90%;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding-left: calc(100vw - 100%);
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: false,
      isDragging: false,
      currDragIndex: -1
    };
  }

  handleOnDragStart = result => {
    this.setState({ isDragging: true, currDragIndex: result.source.index });
  }

  handleOnDragUpdate = result => {
    if (result.destination) {
      this.setState({ currDragIndex: result.destination.index });
    }
  }

  switchTheme = _ => {
    this.setState({ darkTheme: !this.state.darkTheme });
  }

  render() {
    return (
      <Wrapper>
        <GlobalStyles
          isDragging={this.state.isDragging}
          darkTheme={this.state.darkTheme}
        />
        <Header
          switchTheme={this.switchTheme}
          darkTheme={this.state.darkTheme}
        />
        <Main
          isDragging={this.state.isDragging}
          currDragIndex={this.state.currDragIndex}
          onDragStart={this.handleOnDragStart}
          onDragUpdate={this.handleOnDragUpdate}
          resetDrag={_ => this.setState({ isDragging: false, currDragIndex: -1 })}
          darkTheme={this.state.darkTheme}
        />
        <Attribution darkTheme={this.state.darkTheme} />
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));