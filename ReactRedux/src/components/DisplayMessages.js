import React, { Component } from 'react';


export default class DisplayMessages extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleChange = e => {
    this.setState({ input: e.target.value });
  }

  submitMessage = () => {
    this.props.submitNewMessage(this.state.input);
    this.setState({ input: '' });
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input onChange={this.handleChange} value={this.state.input} />
        <button type="submit" onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
};
