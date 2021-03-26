import React from 'react';

import MainGetStarted from './MainGetStarted';
import GratitudePopup from "./GratitudePopup";
// import MainDiscover from './MainDiscover';
// import MainAbout from './MainAbout';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <MainGetStarted onClick={() => this.props.onClick(true)} />
        {/*<MainDiscover />*/}
        {/*<MainAbout />*/}
        {this.props.popupVisible &&
        <GratitudePopup onClick={() => this.props.onClick(false)} />
        }
      </main>
    );
  }
}