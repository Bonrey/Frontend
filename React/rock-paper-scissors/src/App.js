import React from 'react';
import styled from 'styled-components';
import GlobalStyle from "./styles/globalStyle";
import Header from "./components/Header";
import Main from "./components/Main";
import Rules from "./components/Rules";

const Wrapper = styled.div`
  width: 38rem;
  height: 34rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  
  &:after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s;
    z-index: ${props => props.rulesPopup ? 5 : -5};
    background-color: ${props => props.rulesPopup ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  }
`

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesPopup: false
    };
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Wrapper rulesPopup={this.state.rulesPopup}>
          <Header />
          <Main onRulesClick={() => this.setState({ rulesPopup: true })} />
        </Wrapper>
        <Rules
          rulesPopup={this.state.rulesPopup}
          onRulesClose={() => this.setState({ rulesPopup: false })}
        />
      </>
    );
  }
}
