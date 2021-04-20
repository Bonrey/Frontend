import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

import colors from '../assets/styles/colors';
import {CountryInterface} from "../interfaces";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
`

const CountryCard = styled(motion.div)`
  min-height: 20rem;
  background-color: ${colors.light.elements};
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
  outline: none;
  box-shadow: 0 0 0.1rem hsla(0, 0%, 52%, 0.15),
              0 0 0.2rem hsla(0, 0%, 52%, 0.15),
              0 0 0.4rem hsla(0, 0%, 52%, 0.15);

  &:hover {
    cursor: pointer;
  }
`

const Flag = styled.img`
  width: 100%;
  box-shadow: 0 0.1rem 0.1rem hsla(0, 0%, 52%, 0.1),
              0 0.2rem 0.2rem hsla(0, 0%, 52%, 0.1);
`

const CountryInfo = styled.div`
  padding: 1.5rem;
`

const Heading = styled.h2`
  font-weight: 800;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${colors.light.text};
  margin-bottom: 1rem;
`

const InfoItem = styled.p`
  font-weight: 600;
  line-height: 1.8rem;
  
  > span {
    font-weight: 300;
  }
`

const Cards: React.FC<{data: object[]}> = ({data}) => {
  const countriesCards = data.map((country: CountryInterface, index: number) =>
    <CountryCard 
      key={index}
      whileFocus={{y: "-1rem", scale: 1.05}}
      whileHover={{y: "-1rem", scale: 1.05}}
      transition={{duration: 0.3}}
      tabIndex={0}
    >
      <Flag src={country.flag} alt={`flag of ${country.name}`} />
      <CountryInfo>
        <Heading>{country.name}</Heading>
        <InfoItem>Population: <span>{country.population!.toLocaleString("en-US")}</span></InfoItem>
        <InfoItem>Region: <span>{country.region}</span></InfoItem>
        <InfoItem>Capital: <span>{country.capital}</span></InfoItem>
      </CountryInfo>
    </CountryCard>
  );

  return (
    <Grid>
      {countriesCards}
    </Grid>
  );
}

export default Cards;