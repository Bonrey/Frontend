import React, {ChangeEvent, Component} from 'react';
import GlobalStyle from './assets/styles/globalStyle';

import Header from './components/Header';
import Main from './components/home/Main';
import CardMain from './components/detail/CardMain';

import {AppState, CountryInterface} from "./interfaces";
import {shuffleArray, getUrl, getSearchBarFiltered} from './functions';

export default class App extends Component<{}, AppState> {
  _isMounted = false;

  constructor(props: {}) {
    super(props);
    this.state = {
      countryCodes: [],
      homeScreen: true,
      pickedCountry: null,
      regionFiltered: [],
      searchBarFiltered: [],
      isAccordionExpanded: false,
      summaryText: "Filter by Region",
      searchBarValue: ""
    };
  }

  componentDidMount(): void {
    this._isMounted = true;

    if (this._isMounted) {
      fetch(getUrl()).then(resp => resp.json()).then((data: CountryInterface[]) => {
        let countryCodes: object[] = [];
        for (let i = 0; i < data.length; i++) {
          let newEl: {data[i]['alpha3Code']: string} = {};
          newEl[data[i].alpha3Code] = data[i].name;
        }

        const shuffledData = shuffleArray(data);
        this.setState({regionFiltered: shuffledData, searchBarFiltered: shuffledData});
      });

      document.addEventListener('click', e => {
        if (!document.getElementById("dropdownList")!.contains(e.target as Node)) {
          this.setState({isAccordionExpanded: false});
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  handleCountryClick = (name: string) => {
    fetch(getUrl('', name)).then(resp => resp.json()).then(data => {
      this.setState({homeScreen: false, pickedCountry: data});
    });
  }

  render(): React.ReactNode {
    return (
      <>
        <GlobalStyle />
        <Header />
        {!this.state.regionFiltered ? <div /> :
          this.state.homeScreen ?
            <Main
              data={this.state.searchBarFiltered}
              isExpanded={this.state.isAccordionExpanded}
              onClick={this.handleDropdownClick}
              onChange={this.handleSearchBarChange}
              clearFilters={this.handleClearFiltersClick}
              clearSearchBar={this.handleClearSearchBarClick}
              summary={this.state.summaryText}
              searchBarValue={this.state.searchBarValue}
              onCountryClick={this.handleCountryClick}
            /> :
            <CardMain 
              country={this.state.pickedCountry}
            />
        }
      </>
    );
  }
}
