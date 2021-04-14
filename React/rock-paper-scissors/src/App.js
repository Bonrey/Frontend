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

const btnNames = ["rock", "paper", "scissors"];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      userBtnName: "",
      computerBtnName: "",
      rulesPopup: false,
      score: 0
    };
  }

  computerWon = (user, computer) => {
    return (user === "rock" && computer === "paper") ||
      (user === "paper" && computer === "scissors") ||
      (user === "scissors" && computer === "rock");
  }

  handleClick = (gameStarted, userBtnName = "") => {
    this.setState({ gameStarted, userBtnName });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.gameStarted) {
      
    }
  }

  render() {
    let computerBtnName = this.state.userBtnName;
    while (this.state.gameStarted && computerBtnName === this.state.userBtnName) {
      computerBtnName = btnNames[Math.floor(Math.random() * 3)];
    }
    // const computerWon = this.computerWon();

    return (
      <>
        <GlobalStyle />
        <Wrapper rulesPopup={this.state.rulesPopup}>
          <Header score={this.state.score} computerWon={computerWon} />
          <Main
            onClick={this.handleClick}
            gameStarted={this.state.gameStarted}
            userBtnName={this.state.userBtnName}
            computerBtnName={computerBtnName}
            onRulesClick={() => this.setState({ rulesPopup: true })}
            computerWon={computerWon}
          />
        </Wrapper>
        <Rules
          rulesPopup={this.state.rulesPopup}
          onRulesClose={() => this.setState({ rulesPopup: false })}
        />
      </>
    );
  }
}
