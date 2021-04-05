import React, {useState} from 'react';
import Pledge from "./Pledge";

export default function PledgesContainer(props) {
  const [selected, select] = useState(props.selected);

  const pledges = [];
  for (let i = 0; i < 3; i++) {
    let pledgeId = props.pledgesDescription[i].id;
    pledges.push(<Pledge
      key={pledgeId}
      id={pledgeId}
      heading={props.pledgesDescription[i].heading}
      paragraph={props.pledgesDescription[i].paragraph}
      pledgeSum={props.pledgesData[pledgeId].pledgeSum}
      shakeLabel={props.shakeLabel}
      leftNumber={props.pledgesData[pledgeId].leftNumber}
      onChange={id => select(id)}
      onClick={(min, curr, id) => props.onClick(min, curr, id)}
      selected={selected === pledgeId}
      width={props.width}
    />);
  }

  return (
    <div className={`pledges-container-wrapper ${props.className}`}>
      <section className="pledges-container">
        <button className="close" onClick={props.onClose}>
          <svg width="15" height="15">
            <title>Close</title>
            <path
              d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z"
              fill="#000" opacity=".4" />
          </svg>
        </button>
        <h2>Back this project</h2>
        <p>Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
        <div className="pledge-cards">
          <div className={`pledge ${selected === "no-reward" ? "green-border" : ""}`}>
            <header>
              <div className="header-labels no-reward-label">
                <label>
                  <input
                    type="radio"
                    name="radio-group"
                    onChange={_ => {
                      select("no-reward");
                      props.onClick(0, 0, "no-reward");
                    }} />
                  Pledge with no reward
                </label>
              </div>
            </header>
            <p className="pledge-paragraph">Choose to support us without a reward if you simply believe in our project. As a backer,
              you will be signed up to receive product updates via email.</p>
          </div>
          {pledges}
        </div>
      </section>
    </div>
  );
}