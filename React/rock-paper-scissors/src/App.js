import React from 'react';
import styled from 'styled-components';
import GlobalStyle from "./styles/globalStyle";
import Header from "./components/Header";
import Main from "./components/Main";
import Rules from "./components/Rules";

const Wrapper = styled.div`
  width: 38rem;
  height: 34rem;
  display: flex;
  flex-direction: column;
  
  @media only screen and (max-width: 1000px) {
    width: 18rem;
    height: 100vh;
  }
  
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
      gameResult: 0,
      rulesPopup: false,
      score: 0
    };
  }

  getGameResult = (user, computer) => {
    return !user ? 0 : (user === "rock" && computer === "paper") ||
    (user === "paper" && computer === "scissors") ||
    (user === "scissors" && computer === "rock") ? -1 : 1;
  }

  handleClick = (gameStarted, userBtnName = "") => {
    if (!gameStarted) {
      this.setState({ gameStarted });
    } else {
      let computerBtnName = userBtnName;
      while (computerBtnName === userBtnName) {
        computerBtnName = btnNames[Math.floor(Math.random() * 3)];
      }
      let gameResult = this.getGameResult(userBtnName, computerBtnName);
      this.setState({ gameStarted, userBtnName, computerBtnName, gameResult });
      setTimeout(_ => {
        this.setState({score: Math.max(this.state.score + gameResult, 0)})
      }, 2000);
    }
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Wrapper rulesPopup={this.state.rulesPopup}>
          <Header score={this.state.score} />
          <Main
            onClick={this.handleClick}
            gameStarted={this.state.gameStarted}
            userBtnName={this.state.userBtnName}
            computerBtnName={this.state.computerBtnName}
            onRulesClick={() => this.setState({ rulesPopup: true })}
            gameResult={this.state.gameResult}
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