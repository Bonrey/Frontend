import React from 'react';

import iconCheck from '../assets/images/icon-check.svg';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: false
    }
  }

  render() {
    return (
      <div className={`popup ${this.props.className}`}>
        <img src={iconCheck} alt="icon check" />
        <h2>Thanks for your support!</h2>
        <p>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
          an email once our campaign is completed.</p>
        <button className="got-it-btn" onClick={this.props.onClick}>Got it!</button>
      </div>
    );
  }
}
