import React from 'react';

export default function MainDiscover(props) {
  const progress = props.progress;

  return (
    <div id="discover" className="main-discover">
      <div className="stats">
        <div className="info-box">
          <span>$89,914</span>
          <span>of $100,000 backed</span>
        </div>
        <div className="info-box">
          <span>5,007</span>
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