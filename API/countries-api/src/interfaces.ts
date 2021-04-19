export interface CountryInterface {
  name?: string,
  flag?: string,
  population?: number,
  region?: string,
  capital?: string
}

export interface AppState {
  data: CountryInterface[],
  isAccordionExpanded: boolean,
  screen: string,
  summaryText: string,
  searchBarValue: string
}