import React, {Component} from 'react';

import "./App.scss";
import Introduction from "./components/Intro/Introduction";
import Form from "./components/Form/Form";
import Attribution from "./components/Attribution/Attribution";

export default class App extends Component {

  render() {
    return (
      <div className="Wrapper">
        <Introduction />
        <Form />
        <Attribution />
      </div>
    );
  }
}
