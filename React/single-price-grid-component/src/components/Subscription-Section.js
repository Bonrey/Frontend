import React from 'react';

export default function SubscriptionSection() {
  function handleClick() {
    
  }

  return (
    <section className="subscription">
      <h2>Monthly Subscription</h2>
      <p><span>$29</span>per month</p>
      <p>Full access for less than $1 a day</p>
      <button onClick={handleClick}>Sign Up</button>
    </section>
  );
}