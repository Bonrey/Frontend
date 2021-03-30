import React from 'react';

export default function MainAboutCard(props) {
  const button = !props.leftNumber ? <button>Out of stock</button> : <button>Select Reward</button>;

  return (
    <section className={`main-about__card ${!props.leftNumber ? "disabled" : ""}`}>
      <header>
        <h3>{props.heading}</h3>
        <p>Pledge ${props.pledgeSum} or more</p>
      </header>
      <p>{props.paragraph}</p>
      <div className="main-about__card__bottom">
        <p><span>{props.leftNumber}</span>left</p>
        {button}
      </div>
    </section>
  );
}