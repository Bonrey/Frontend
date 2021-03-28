import React from 'react';

import JoinSection from "./Join-Section";
import SubscriptionSection from "./Subscription-Section";
import WhyUsSection from "./WhyUs-Section";

export default function Card() {
  return (
    <main>
      <JoinSection />
      <div className="main-bottom">
        <SubscriptionSection />
        <WhyUsSection />
      </div>
    </main>
  );
}