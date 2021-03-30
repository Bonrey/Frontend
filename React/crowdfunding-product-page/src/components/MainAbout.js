import React from 'react';

import MainAboutCard from "./MainAboutCard";

export default function MainAbout() {
  return (
    <div id="about" className="main-about">
      <h2>About this project</h2>
      <p>The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen
        to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve
        your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
      <p>Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer
        to allow notepads, pens, and USB sticks to be stored under the stand.</p>
      <MainAboutCard
        heading="Bamboo Stand"
        pledgeSum={25}
        paragraph="You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and
you’ll be added to a special Backer member list."
        leftNumber={101}
      />
      <MainAboutCard
        heading="Black Edition Stand"
        pledgeSum={75}
        paragraph="You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer
member list. Shipping is included."
        leftNumber={64}
      />
      <MainAboutCard
        heading="Mahogany Special Edition"
        pledgeSum={200}
        paragraph="You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added
to our Backer member list. Shipping is included."
        leftNumber={0}
      />
    </div>
  );
}