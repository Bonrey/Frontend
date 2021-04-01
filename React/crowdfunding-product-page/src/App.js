import React from 'react';

import Preloaded from './components/Preloaded';
import Header from './components/Header';
import Main from './components/Main';
//import Attribution from './components/Attribution';

import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClicked: false,
      pledgesMenuVisible: false,
      selectedPledge: "",
      popupFadeIn: false
    };
  }

  handleClick(selected) {
    // this.setState({ btnClicked: true, popupFadeIn: popupVisible });
    // setTimeout(_ => this.setState({
    //   popupVisible: popupVisible
    // }), popupVisible ? 0 : 400);

    this.setState({ pledgesMenuVisible: true, selectedPledge: selected });
  }

  render() {
    return (
      <div>
        <Preloaded />
        <div className={!this.state.btnClicked ? "" : this.state.popupFadeIn ? "dark-bg fade-in" : "dark-bg fade-out"}>
          <Header />
          <Main
            className={!this.state.btnClicked ? "" : this.state.popupFadeIn ? " show-popup" : " hide-popup"}
            pledgesMenuVisible={this.state.pledgesMenuVisible}
            selectedPledge = {this.state.selectedPledge}
            onClick={id => this.handleClick(id)}
          />
          {/*<Attribution />*/}
        </div>
      </div>
    );
  }
}
