import React from 'react';
import styled from 'styled-components';

import colors from '../../assets/styles/colors';
import MainDetails from './MainDetails';
import BorderCountries from './BorderCountries';
import { CountryInterface } from '../../interfaces';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.article`
  width: 80%;
  display: flex;
  align-items: center;
`

const Flag = styled.img`
  height: 20rem;
`

const Main = styled.div`
  padding: 2rem;
  margin-left: 4rem;
`

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`

type Props = {
  country: CountryInterface | null
}

const CardMain: React.FC<Props> = ({country}) => {
  return (
    <Wrapper>
      <Container>
        <Flag src={country!.flag} alt={"flag of " + country!.name} />
        <Main>
          <Heading>{country!.name}</Heading>
          <MainDetails country={country} />
          <BorderCountries country={country} />
        </Main>
      </Container>
    </Wrapper>
  );
}

export default CardMain;
