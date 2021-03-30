import React from 'react';

export default class MainStartBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarked: false };
  }

  handleChange = e => this.setState({ bookmarked: e.target.checked });

  render() {
    return (
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
    );
  }
}