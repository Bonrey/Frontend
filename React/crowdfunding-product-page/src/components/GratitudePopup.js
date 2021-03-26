import React from 'react';

import iconCheck from '../assets/images/icon-check.svg';

export default function GratitudePopup(props) {
  return (
    <div className="gratitude-popup">
      <img src={iconCheck} alt="icon check" />
      <h2>Thanks for your support!</h2>
      <p>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
        an email once our campaign is completed.</p>
      <button className="got-it-btn" onClick={props.onClick}>Got it!</button>
    </div>
  );
}
