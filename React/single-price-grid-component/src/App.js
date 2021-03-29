import React from 'react';

import './App.scss';
import Card from "./components/Card";
import ThankYou from "./components/ThankYou";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLaunch: true,
      btnClicked: false,
      cardFadeOut: false,
      cardHidden: false,
      thanksFadeIn: false
    }
  }

  handleClick = () => {
    // 1) Fade out the card component
    this.setState({ btnClicked: true, cardFadeOut: true });
    // 2) Hide the card component & Fade in the "ThankYou" box
    setTimeout(_ => this.setState({
        cardFadeOut: false,
        cardHidden: true,
        thanksFadeIn: true
      }
    ), 2000);
    // 3) Fade out the "ThankYou" box
    setTimeout(_ => this.setState({
        thanksFadeIn: false
    }), 4000);
    // 4) Hide the "ThankYou" box and Fade in the card component
    setTimeout(_ => this.setState({
        cardFadeOut: false,
        cardHidden: false,
      }
    ), 6000);
  }

  componentDidMount() {
    setTimeout(_ => this.setState({ firstLaunch: false }), 1000);
  }

  render() {
    return (
      <div>
        {!this.state.cardHidden && <Card
          className={
            this.state.firstLaunch ? "first-time-animation" :
            this.state.btnClicked ? (this.state.cardFadeOut ? "card-fade-out" : "card-fade-in") : ""
          }
          onClick={this.handleClick}
        />}
        {this.state.cardHidden && <ThankYou
          className={
            this.state.thanksFadeIn ? "thank-you thanks-fade-in" : "thank-you thanks-fade-out"
          }
        />}
      </div>
    );
  }
}
