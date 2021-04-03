import React from 'react';

import Preloaded from './components/Preloaded';
import Header from './components/Header';
import Main from './components/Main';
import Attribution from './components/Attribution';

import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClicked: false,
      pledgesMenuVisible: false,
      selectedPledge: "",
      pledgesFadeIn: false,
      popupFadeIn: false,
      popupFadeOut: false,
      popupDisappear: true
    };
  }

  handleClick(selected) {
    if (selected === "close") {
      document.body.style.overflowY = "visible";
      this.setState({ pledgesFadeIn: false });
      setTimeout(_ => this.setState({
        pledgesMenuVisible: false,
        selectedPledge: ""
      }), 600);
    } else if (selected === "got-it") {
      document.body.style.overflowY = "visible";
      this.setState({
        popupFadeIn: false,
        popupFadeOut: true
      });
      setTimeout(_ => this.setState({
        popupDisappear: true
      }), 600);
    } else {
      document.body.style.overflowY = "hidden";
      this.setState({
        btnClicked: true,
        pledgesFadeIn: true,
        pledgesMenuVisible: true,
        selectedPledge: selected
      });
    }
  }

  handlePledgesClick = (min, curr) => {
    if (curr >= min) {
      this.setState({ pledgesFadeIn: false, popupFadeIn: true, popupDisappear: false });
      setTimeout(_ => this.setState({
        pledgesMenuVisible: false,
        selectedPledge: ""
      }), 600);
    }
  }

  render() {
    return (
      <div>
        <Preloaded />
        <div className={!this.state.btnClicked ? "" :
        (this.state.pledgesFadeIn ? "dark-bg fade-in" :
          this.state.popupFadeIn ? "dark-bg" : "dark-bg fade-out")}>
          <Header />
          <Main
            pledgesClassName={this.state.pledgesFadeIn ? "show-pledges" : "hide-pledges"}
            popupClassName={this.state.popupFadeIn ? "show-popup" : this.state.popupFadeOut ? "hide-popup" : ""}
            pledgesMenuVisible={this.state.pledgesMenuVisible}
            selectedPledge={this.state.selectedPledge}
            popupDisappear={this.state.popupDisappear}
            onClick={id => this.handleClick(id)}
            onPledgesClick={(min, curr) => this.handlePledgesClick(min, curr)}
          />
          <Attribution />
        </div>
      </div>
    );
  }
}