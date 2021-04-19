import React, {ChangeEvent, Component} from 'react';
import GlobalStyle from './assets/styles/globalStyle';
import Header from './components/Header';
import Main from './components/home/Main';
import {CountryInterface, AppState} from "./interfaces";

const shuffleArray = (array: CountryInterface[]) => {
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const urlSuffix = "?fields=name;flag;population;region;capital";

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      isAccordionExpanded: false,
      screen: "home",
      summaryText: "Filter by Region",
      searchBarValue: ""
    };
  }

  componentDidMount(): void {
    fetch(`https://restcountries.eu/rest/v2${urlSuffix}`)
    .then(resp => resp.json()).then(data => {
        this.setState({data: shuffleArray(data)});
      }
    );
  }

  handleClick = (region?: string) => {
    if (!region) {
      if (this.state.isAccordionExpanded) {
        this.setState({isAccordionExpanded: false});
      } else {
        this.setState({isAccordionExpanded: true, summaryText: "Filter by Region"});
      }
      return;
    }

    const url = `https://restcountries.eu/rest/v2/region/${region === "America" ? "Americas" : region}${urlSuffix}`;
    fetch(url).then(resp => resp.json()).then(data => this.setState({ 
      data: shuffleArray(data),
      isAccordionExpanded: false,
      summaryText: region
    }));
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let data = [...this.state.data];
    
    for (let i = 0; i < data.length;) {
      if (!data[i].name.includes(val)) {
        data.splice(i, 1);
      } else {
        i++;
      }
    }
    this.setState({data, searchBarValue: val});
  }

  render(): React.ReactNode {
    return (
      <>
        <GlobalStyle />
        <Header />
        {!this.state.data ? <div /> :
          this.state.screen === "home" ?
            <Main
              data={this.state.data}
              isExpanded={this.state.isAccordionExpanded}
              onClick={this.handleClick}
              onChange={this.handleChange}
              summary={this.state.summaryText}
              searchBarValue={this.state.searchBarValue}
            /> :
            <div />
        }
      </>
    );
  }
}
