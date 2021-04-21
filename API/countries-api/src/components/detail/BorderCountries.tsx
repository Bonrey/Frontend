import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

import colors from '../../assets/styles/colors';
import { CountryInterface } from '../../interfaces';

const Container = styled.div`
  display: flex;

  > span {
    font-weight: 800;
  }
`

const BorderCountry = styled.button`
  outline: none;
  border: none;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 300;
  margin: 0 0.5rem;
  color: ${colors.light.text};
`

type Props = {
  country: CountryInterface | null
}

const BorderCountries: React.FC<Props> = ({country}) => {
  console.log(country!.borders);

  return (
    <Container>
      <span>BorderCountries:</span>
      {country!.borders.map((border, i) => {
        return (
          <BorderCountry key={i} type="button">
            {border}
          </BorderCountry>
        );
      })}
    </Container>
  );
}

export default BorderCountries;
