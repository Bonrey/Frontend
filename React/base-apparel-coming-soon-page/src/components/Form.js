import React from 'react';
import iconArrow from '../assets/images/icon-arrow.svg';
import errorIcon from '../assets/images/icon-error.svg';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validInput: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value, validInput: true });
  }

  handleClick(event) {
    event.preventDefault();
    if (!/\w+@\w+\.\w+/.test(this.state.email)) {
      this.setState({ email: 'janeappleseed@email.com', validInput: false });
    } else {
      this.setState({ email: '', validInput: true });
    }
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Email Address"
          value={this.state.email}
          onChange={this.handleChange}
          className={this.state.validInput ? "DefaultBorder" : "ErrorBorder"}
        />
        <button type="submit" aria-label="submit button" onClick={this.handleClick}>
          <img src={iconArrow} alt="arrow icon" />
        </button>
        {!this.state.validInput &&
        <div>
          <img className="ErrorIcon" src={errorIcon} alt="error icon" />
          <p className="ErrorLabel">Please provide a valid email</p>
        </div>
        }
      </form>
    );
  }
}