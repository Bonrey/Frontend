import React from 'react';

export default class Pledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functionalityShown: false,
      currentSum: ""
    };
  }

  handleChange = (e) => {
    this.setState({ currentSum: e.target.value });
  }

  componentDidMount() {
    if (this.props.selected) {
      this.props.onChange(this.props.id);
      this.setState({ functionalityShown: true });
    }
  }

  componentDidUpdate() {
    if (this.props.selected && !this.state.functionalityShown) {
      this.setState({ functionalityShown: true });
    } else if (!this.props.selected && this.state.functionalityShown) {
      setTimeout(_ => this.setState({ functionalityShown: false }), 400);
    }
  }

  render() {
    const leftNumber = <p className="left-number"><span>{this.props.leftNumber}</span>left</p>;

    return (
      <div
        className={`pledge ${this.props.selected ? "green-border" : ""} ${!this.props.leftNumber ? "disabled-card" : ""}`}>
        <header>
          <div className="header-labels">
            <label>
              <input
                id={this.props.id}
                type="radio"
                name="radio-group"
                onChange={e => this.props.onChange(e.target.id)}
                checked={this.props.selected}
              />
              {this.props.heading}
            </label>
            <p className={`pledge-sum ${this.props.id === this.props.shakeLabel ? "shake" : ""}`}>Pledge
              ${this.props.pledgeSum} or more</p>
          </div>
          {this.props.width > 720 && leftNumber}
        </header>
        <p className="pledge-paragraph">{this.props.paragraph}</p>
        {this.props.width <= 720 && leftNumber}
        {this.state.functionalityShown && <div className={this.props.selected ? "show" : "hide"}>
          <hr />
          <div className="pledge__functionality">
            <p>Enter your pledge</p>
            <form onSubmit={e => e.preventDefault()}>
              <label>
                <span>$</span>
                <input
                  autoFocus
                  type="number"
                  value={this.state.currentSum}
                  onChange={this.handleChange} />
              </label>
              <button
                onClick={_ => this.props.onClick(this.props.pledgeSum, this.state.currentSum, this.props.id)}>
                Continue
              </button>
            </form>
          </div>
        </div>}
      </div>
    );
  }
}