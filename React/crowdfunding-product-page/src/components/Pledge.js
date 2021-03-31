import React from 'react';

export default function Pledge(props) {
  return (
    <div className={`pledge ${props.selected ? "green-border" : ""} ${!props.leftNumber ? "disabled-card" : ""}`}>
      <header>
        <div>
          <label>
            <input id={props.id} type="radio" name="radio-group" onChange={e => props.onChange(e)} />
            {props.heading}
          </label>
          <p>Pledge ${props.pledgeSum} or more</p>
        </div>
        <p><span>{props.leftNumber}</span>left</p>
      </header>
      <p>{props.paragraph}</p>
      {props.selected &&
      <div>
        <hr />
        <div className="pledge__functionality">
          <p>Enter your pledge</p>
          <form>
            <label>
              <span>$</span>
              <input autoFocus type="number" />
            </label>
            <button>Continue</button>
          </form>
        </div>
      </div>
      }
    </div>
  );
}