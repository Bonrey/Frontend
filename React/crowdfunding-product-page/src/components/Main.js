import React from 'react';

import MainStart from './MainStart';
import MainDiscover from './MainDiscover';
import MainAbout from './MainAbout';
import PledgesContainer from "./PledgesContainer";
import Popup from "./Popup";

import {pledgesDescription} from "./Preloaded";

export default function Main(props) {
  return (
    <main>
      <MainStart onClick={_ => props.onClick("")} width={props.width} />
      <MainDiscover
        moneyBacked={props.moneyBacked}
        totalBackers={props.totalBackers}
      />
      <MainAbout
        pledgesDescription={pledgesDescription.slice(1)}
        pledgesData={props.pledgesData}
        onClick={props.onClick}
      />
      {props.pledgesMenuVisible && <PledgesContainer
        pledgesDescription={pledgesDescription}
        pledgesData={props.pledgesData}
        selected={props.selectedPledge}
        className={props.pledgesClassName}
        shakeLabel={props.shakeLabel}
        onClick={(min, curr, id) => props.onPledgesClick(min, curr, id)}
        onClose={_ => props.onClick("close")}
        width={props.width}
      />}
      {!props.popupDisappear && <Popup
        className={props.popupClassName}
        onClick={_ => props.onClick("got-it")}
      />}
    </main>
  );
}