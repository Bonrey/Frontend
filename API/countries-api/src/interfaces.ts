export interface CountryInterface {
  name: string,
  flag: string,
  population: number,
  region: string,
  capital: string,
  nativeName: string,
  subregion: string,
  topLevelDomain: Array<object>,
  currencies: Array<object>,
  languages: Array<object>,
  borders: Array<string>,
  alpha3Code: string
}

export interface AppState {
  countryCodes: object[]
  regionFiltered: CountryInterface[],
  searchBarFiltered: CountryInterface[],
  pickedCountry: CountryInterface | null,
  isAccordionExpanded: boolean,
  homeScreen: boolean,
  summaryText: string,
  searchBarValue: string
}