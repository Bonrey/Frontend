import React from 'react';

import MainStartBottom from './MainStartBottom';
import logoMastercraft from '../assets/images/logo-mastercraft.svg';

export default function MainStart(props) {
  return (
    <div id="get-started" className="main-start">
      <img src={logoMastercraft} alt="logo mastercraft" />
      <h1>Mastercraft Bamboo Monitor Riser</h1>
      <p>A beautiful & handcrafted monitor stand to reduce neck and eye strain.</p>
      <MainStartBottom onClick={props.onClick} width={props.width} />
    </div>
  );
}