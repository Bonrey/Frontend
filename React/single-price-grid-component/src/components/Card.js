import React from 'react';

import JoinSection from "./Join-Section";
import SubscriptionSection from "./Subscription-Section";
import WhyUsSection from "./WhyUs-Section";

export default function Card(props) {
  return (
    <main className={props.className}>
      <JoinSection />
      <div className="main-bottom">
        <SubscriptionSection onClick={props.onClick} />
        <WhyUsSection />
      </div>
    </main>
  );
}