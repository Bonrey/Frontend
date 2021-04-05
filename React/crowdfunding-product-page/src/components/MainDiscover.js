import React from 'react';

export default function MainDiscover(props) {
  const progress = Math.min(Math.floor(props.moneyBacked / 1000), 100);

  return (
    <div id="discover" className="main-discover">
      <div className="stats">
        <div className="info-box">
          <span>${props.moneyBacked.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span>of $100,000 backed</span>
        </div>
        <div className="info-box">
          <span>{props.totalBackers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span>total backers</span>
        </div>
        <div className="info-box">
          <span>56</span>
          <span>days left</span>
        </div>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}