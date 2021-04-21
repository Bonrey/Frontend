import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

import colors from '../../assets/styles/colors';
import { CountryInterface } from '../../interfaces';

const Container = styled.div`
  display: flex;
`

const FiveRows = styled.div`
`

const ThreeRows = styled.div`

`

const Item = styled.p`
  width: 16rem;
  margin-bottom: 0.75rem;
  color: ${colors.light.text};
  font-weight: 800;

  > span {
    font-weight: 300;
  }
`

const getCurrencies = (country: CountryInterface | null) => {
  return (country!.currencies as Array<{name: string}>).map(obj => obj.name);
}

const getLanguages = (country: CountryInterface | null) => {
  return (country!.languages as Array<{name: string}>).map(obj => obj.name);
}

const MainDetails: React.FC<{country: CountryInterface | null}> = ({country}) => {
  return (
    <Container>
      <FiveRows>
        <Item>Native name: <span>{country!.nativeName}</span></Item>
        <Item>Population: <span>{country!.population.toLocaleString("en-US")}</span></Item>
        <Item>Region: <span>{country!.region}</span></Item>
        <Item>Sub Region: <span>{country!.subregion}</span></Item>
        <Item>Capital: <span>{country!.capital}</span></Item>
      </FiveRows>
      <ThreeRows>
        <Item>Top Level Domain: <span>{country!.topLevelDomain[0]}</span></Item>
        <Item>Currencies: <span>{getCurrencies(country).join(", ")}</span></Item>
        <Item>Languages: <span>{getLanguages(country).join(", ")}</span></Item>
      </ThreeRows>
    </Container>
  );
}

export default MainDetails;
