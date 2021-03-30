import React from 'react';

import Preloaded from './components/Preloaded';
import Header from './components/Header';
import Main from './components/Main';
//import Attribution from './components/Attribution';

import './css/App.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preloaded: false,
      btnClicked: false,
      popupVisible: false,
      popupFadeIn: false
    };
  }

  componentDidMount() {
    this.setState({ preloaded: true });
  }

  handleClick(popupVisible) {
    this.setState({ btnClicked: true, popupFadeIn: popupVisible });
    setTimeout(_ => this.setState({
      popupVisible: popupVisible
    }), popupVisible ? 0 : 400);
  }

  render() {
    return (
      <div>
        {!this.state.preloaded && <Preloaded />}
        {this.state.preloaded &&
        <div className={!this.state.btnClicked ? "" : this.state.popupFadeIn ? "dark-bg fade-in" : "dark-bg fade-out"}>
          <Header />
          <Main
            className={!this.state.btnClicked ? "" : this.state.popupFadeIn ? " show-popup" : " hide-popup"}
            popupVisible={this.state.popupVisible}
            onClick={param => this.handleClick(param)}
          />
          {/*<Attribution />*/}
        </div>
        }
      </div>
    );
  }
}
