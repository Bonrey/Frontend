import React, {ChangeEvent, Component} from 'react';
import GlobalStyle from './assets/styles/globalStyle';

import Header from './components/Header';
import Main from './components/home/Main';
import {AppState} from "./interfaces";
import {shuffleArray, getUrl, getSearchBarFiltered} from './functions';

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      screen: "home",
      regionFiltered: [],
      searchBarFiltered: [],
      isAccordionExpanded: false,
      summaryText: "Filter by Region",
      searchBarValue: ""
    };
  }

  componentDidMount(): void {
    fetch(getUrl()).then(resp => resp.json()).then(data => {
      const shuffledData = shuffleArray(data);
      this.setState({regionFiltered: shuffledData, searchBarFiltered: shuffledData});
    });

    document.addEventListener('click', e => {
      if (!document.getElementById("dropdownList").contains(e.target as Node)) {
        this.setState({isAccordionExpanded: false});
      }
    });
  }

  handleDropdownClick = (region?: string) => {
    if (!region) {
      this.setState({isAccordionExpanded: !this.state.isAccordionExpanded});
    } else {
      this.setState({isAccordionExpanded: false, summaryText: region});
      fetch(getUrl(region)).then(resp => resp.json()).then(fetchedData => {
        this.setState({
          regionFiltered: fetchedData,
          searchBarFiltered: getSearchBarFiltered(fetchedData, this.state.searchBarValue),
      })});
    }
  }

  handleClearFiltersClick = () => {
    this.setState({summaryText: "Filter by Region"});
    fetch(getUrl()).then(resp => resp.json()).then(fetchedData => {
      const data = this.state.searchBarValue ? fetchedData : shuffleArray(fetchedData);
      this.setState({
        regionFiltered: data,
        searchBarFiltered: getSearchBarFiltered(data, this.state.searchBarValue),
      });
    });
  }

  handleClearSearchBarClick = () => {
    this.setState({
      searchBarFiltered: getSearchBarFiltered(this.state.regionFiltered, ""),
      searchBarValue: ""
    });
  }

  handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchBarValue = e.target.value;
    const searchBarFiltered = getSearchBarFiltered(this.state.regionFiltered, searchBarValue);
    this.setState({searchBarFiltered, searchBarValue});
  }

  render(): React.ReactNode {
    return (
      <>
        <GlobalStyle />
        <Header />
        {!this.state.regionFiltered ? <div /> :
          this.state.screen === "home" ?
            <Main
              data={this.state.searchBarFiltered}
              isExpanded={this.state.isAccordionExpanded}
              onClick={this.handleDropdownClick}
              onChange={this.handleSearchBarChange}
              clearFilters={this.handleClearFiltersClick}
              clearSearchBar={this.handleClearSearchBarClick}
              summary={this.state.summaryText}
              searchBarValue={this.state.searchBarValue}
            /> :
            <div />
        }
      </>
    );
  }
}
