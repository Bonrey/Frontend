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
        { pledgeSum: 25, leftNumber: 101 },
        { pledgeSum: 75, leftNumber: 64 },
        { pledgeSum: 200, leftNumber: 0 }
      ],
      popupFadeIn: false,
      pledgesMenu: props.className
    }
  }

  render() {
    return (
      <main>
        <MainStart onClick={_ => this.props.onClick("")} />
        <MainDiscover progress={89} />
        <MainAbout
          pledgesDescription={pledgesDescription}
          pledgesData={this.state.pledgesData}
          onClick={this.props.onClick}
        />
        {this.props.pledgesMenuVisible && <PledgesContainer
          pledgesDescription={pledgesDescription}
          pledgesData={this.state.pledgesData}
          selected={this.props.selectedPledge}
          className={this.props.pledgesClassName}
          onClick={(min, curr) => this.props.onPledgesClick(min, curr)}
          onClose={_ => this.props.onClick("close")}
        />}
        {!this.props.popupDisappear &&
        <Popup
          className={this.props.popupClassName}
          onClick={_ => this.props.onClick("got-it")}
        />
        }
      </main>
    );
  }
}