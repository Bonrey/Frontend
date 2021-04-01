import React from 'react';

import MainAboutCard from "./MainAboutCard";

export default function MainAbout(props) {
  const cards = [];
  for (let i = 0; i < 3; i++) {
    cards.push(<MainAboutCard
      key={props.pledgesDescription[i].id}
      id={props.pledgesDescription[i].id}
      heading={props.pledgesDescription[i].heading}
      paragraph={props.pledgesDescription[i].paragraph}
      pledgeSum={props.pledgesData[i].pledgeSum}
      leftNumber={props.pledgesData[i].leftNumber}
      onClick={props.onClick}
    />);
  }

  return (
    <div id="about" className="main-about">
      <h2>About this project</h2>
      <p>The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen
        to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve
        your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
      <p>Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer
        to allow notepads, pens, and USB sticks to be stored under the stand.</p>
      {cards}
    </div>
  );
}