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
      fadeIn: false
    };
  }

  handleClick(selected) {
    if (selected === "close") {
      document.body.style.overflow = "visible";
      this.setState({
        btnClicked: true,
        fadeIn: false
      });
      setTimeout(_ => this.setState({
        pledgesMenuVisible: false,
        selectedPledge: ""
      }), 600);
    } else {
      document.body.style.overflow = "hidden";
      this.setState({
        btnClicked: true,
        fadeIn: true,
        pledgesMenuVisible: true,
        selectedPledge: selected
      });
    }
  }

  render() {
    return (
      <div>
        <Preloaded />
        <div className={!this.state.btnClicked ? "" : this.state.fadeIn ? "dark-bg fade-in" : "dark-bg fade-out"}>
          <Header />
          <Main
            className={this.state.fadeIn ? "show-pledges" : "hide-pledges"}
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
