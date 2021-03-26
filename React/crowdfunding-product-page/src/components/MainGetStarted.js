import React from 'react';

import GratitudePopup from './GratitudePopup';

import mastercraftLogo from '../assets/images/logo-mastercraft.svg';

export default class MainGetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ bookmarked: event.target.checked });
  }

  render() {
    return (
      <div id="get-started" className="main-get-started">
        <img src={mastercraftLogo} alt="mastercraft logo" />
        <h1>Mastercraft Bamboo Monitor Riser</h1>
        <p>A beautiful & handcrafted monitor stand to reduce neck and eye strain.</p>
        <div className="bookmark-section">
          <button
            className="back-btn"
            type="button"
            onClick={this.props.onClick}>Back this project
          </button>
          <label className={this.state.bookmarked ? "active" : "default"}>
            <input type="checkbox" onChange={this.handleChange} />
            {this.state.bookmarked ? "Bookmarked" : "Bookmark"}
          </label>
        </div>
      </div>
    );
  }
}