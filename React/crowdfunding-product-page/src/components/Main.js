import React from 'react';

import MainStart from './MainStart';
import Popup from "./Popup";
import MainDiscover from './MainDiscover';
import MainAbout from './MainAbout';

export default function Main(props) {
  return (
    <main>
      <MainStart onClick={_ => props.onClick(true)} />
      <MainDiscover progress={89} />
      <MainAbout />
      {props.popupVisible &&
      <Popup
        className={props.className}
        onClick={_ => props.onClick(false)}
      />
      }
    </main>
  );
}