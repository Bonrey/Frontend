import React from 'react';
import styled from 'styled-components';

import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import Cards from '../Cards';

const Container = styled.main`
  padding: 0 5vw;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
`

const Main = () => {
  return (
    <Container>
      <Top>
        <SearchBar />
        <Dropdown />
      </Top>
      <Cards />
    </Container>
  );
}

export default Main;