import React from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Attribution from './components/Attribution';

import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };
  }

  handleClick(popupVisible) {
    this.setState({ popupVisible: popupVisible });
  }

  render() {
    return (
      <div className={this.state.popupVisible ? "darkened" : ""}>
        <Header />
        <Main
          popupVisible={this.state.popupVisible}
          onClick={param => this.handleClick(param)}
        />
        {/*<Attribution />*/}
      </div>
    );
  }
}
