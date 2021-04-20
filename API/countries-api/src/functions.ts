import {CountryInterface} from './interfaces';

const shuffleArray = (array: CountryInterface[]): CountryInterface[] => {
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const requiredProperties = [
  "name", "nativeName", "flag", "population", "region", "subregion", "capital", "topLevelDomain", "currencies", "languages"
];
const urlSuffix = "?fields=" + requiredProperties.join(";");
const getUrl = (region?: string) => {
  return `https://restcountries.eu/rest/v2/${region ? `region/${region === "America" ? "Americas" : region}` : "all"}${urlSuffix}`;
}

const getSearchBarFiltered = (regionFiltered: CountryInterface[], searchBarValue: string) => {
  let searchBarFiltered = [...regionFiltered];
  for (let i = 0; i < searchBarFiltered.length;) {
    if (!searchBarFiltered[i].name.toLowerCase().includes(searchBarValue.toLowerCase())) {
      searchBarFiltered.splice(i, 1);
    } else {
      i++;
    }
  }
  return searchBarFiltered;
}

export {shuffleArray, getUrl, getSearchBarFiltered};
