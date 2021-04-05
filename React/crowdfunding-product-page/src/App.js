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
      popupDisappear: true,
      shakeLabel: "",
      menuFadeIn: false,
      menuShown: false,
      moneyBacked: 89914,
      totalBackers: 5007,
      width: window.outerWidth,
      pledgesData: {
        "no-reward": { pledgesSum: "none", leftNumber: "none" },
        "bamboo-stand": { pledgeSum: 25, leftNumber: 101 },
        "black-edition-stand": { pledgeSum: 75, leftNumber: 64 },
        "mahogany-special-edition": { pledgeSum: 200, leftNumber: 1 },
      }
    };
  }

  updateDimensions = _ => this.setState({ width: window.outerWidth });

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleClick(selected) {
    if (selected === "close") {
      document.body.style.overflowY = "visible";
      this.setState({ pledgesFadeIn: false });
      setTimeout(_ => this.setState({
        pledgesMenuVisible: false,
        selectedPledge: ""
      }), 570);
    } else if (selected === "got-it") {
      document.body.style.overflowY = "visible";
      this.setState({
        popupFadeIn: false,
        popupFadeOut: true
      });
      setTimeout(_ => this.setState({
        popupDisappear: true
      }), 570);
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

  handlePledgesClick = (min, curr, id) => {
    let noReward = id === "no-reward";
    if (noReward || curr >= min) {
      this.setState({ pledgesFadeIn: false, popupFadeIn: true, popupDisappear: false });
      setTimeout(_ => this.setState(prevState => {
        let pledgesData = { ...prevState.pledgesData };
        if (!noReward) pledgesData[id].leftNumber--;
        return {
          pledgesMenuVisible: false,
          selectedPledge: "",
          moneyBacked: this.state.moneyBacked + Number.parseInt(curr),
          totalBackers: this.state.totalBackers + 1,
          pledgesData: pledgesData
        }
      }), 570);
    } else {
      this.setState({ shakeLabel: id });
      setTimeout(_ => this.setState({ shakeLabel: "" }), 570);
    }
  }

  handleMenuClick = param => {
    if (param === "anchor" || this.state.menuShown) {
      document.getElementById("header").style.zIndex = "0";
      this.setState({ menuFadeIn: false });
      setTimeout(_ => this.setState({ menuShown: false }), 380);
    } else {
      document.getElementById("header").style.zIndex = "3";
      this.setState({ menuFadeIn: true, menuShown: true });
    }
  }

  render() {
    return (
      <div>
        <Preloaded />
        <div className={(!this.state.btnClicked && !this.state.menuFadeIn) ? "" :
          (this.state.pledgesFadeIn || this.state.menuFadeIn) ? "dark-bg fade-in" :
            this.state.popupFadeIn ? "dark-bg" : "dark-bg fade-out"}>
          <Header
            className={this.state.menuFadeIn ? "show-menu" : "hide-menu"}
            onClick={param => this.handleMenuClick(param)}
            menuShown={this.state.menuShown}
            width={this.state.width}
          />
          <Main
            pledgesClassName={this.state.pledgesFadeIn ? "show-pledges" : "hide-pledges"}
            popupClassName={this.state.popupFadeIn ? "show-popup" : this.state.popupFadeOut ? "hide-popup" : ""}
            shakeLabel={this.state.shakeLabel}
            pledgesMenuVisible={this.state.pledgesMenuVisible}
            selectedPledge={this.state.selectedPledge}
            popupDisappear={this.state.popupDisappear}
            onClick={id => this.handleClick(id)}
            onPledgesClick={(min, curr, id) => this.handlePledgesClick(min, curr, id)}
            moneyBacked={this.state.moneyBacked}
            totalBackers={this.state.totalBackers}
            pledgesData={this.state.pledgesData}
            width={this.state.width}
          />
          <Attribution />
        </div>
      </div>
    );
  }
}