import React from 'react';

import MainStartBottom from './MainStartBottom';
import {images} from './Preloaded';

export default function MainStart(props) {
  return (
    <div id="get-started" className="main-start">
      <img src={images.logoMastercraft} alt="logo mastercraft" />
      <h1>Mastercraft Bamboo Monitor Riser</h1>
      <p>A beautiful & handcrafted monitor stand to reduce neck and eye strain.</p>
      <MainStartBottom onClick={props.onClick}/>
    </div>
  );
}