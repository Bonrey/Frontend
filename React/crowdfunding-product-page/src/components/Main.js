import React from 'react';

import MainStart from './MainStart';
import MainDiscover from './MainDiscover';
import MainAbout from './MainAbout';
import PledgesContainer from "./PledgesContainer";
import Popup from "./Popup";

import {pledgesDescription} from "./Preloaded";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pledgesData: [
        { pledgeSum: 0, leftNumber: 0 },
        { pledgeSum: 25, leftNumber: 101 },
        { pledgeSum: 75, leftNumber: 64 },
        { pledgeSum: 200, leftNumber: 0 }
      ]
    }
  }

  render() {
    return (
      <main>
        <MainStart onClick={_ => this.props.onClick(true)} />
        <MainDiscover progress={89} />
        <MainAbout pledgesDescription={pledgesDescription} pledgesData={this.state.pledgesData} />
        <PledgesContainer pledgesDescription={pledgesDescription} pledgesData={this.state.pledgesData} />
        {this.props.popupVisible &&
        <Popup
          className={this.props.className}
          onClick={_ => this.props.onClick(false)}
        />
        }
      </main>
    );
  }
}