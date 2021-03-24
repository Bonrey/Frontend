import React from 'react';

export default class Popup extends React.Component {
  render() {
    return <p className={this.props.classNames}>{this.props.email} added.</p>;
  }
}