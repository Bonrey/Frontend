import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

import SearchBar from "./SearchBar";
import DropdownList from "./DropdownList";
import Cards from '../Cards';

import {CountryInterface} from '../../interfaces';

const Container = styled(motion.main)`
  padding: 0 5vw;
  margin: 9rem 0 4rem;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
`

type Props = {
  data: CountryInterface[],
  isExpanded: boolean,
  summary: string,
  searchBarValue: string,
  onClick(region?: string): void,
  clearFilters(): void,
  clearSearchBar(): void,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  onCountryClick(name: string): void
}

const Main: React.FC<Props> = (props) => {
  return (
    <Container
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 1}}
    >
      <Top>
        <SearchBar 
          onChange={props.onChange}
          searchBarValue={props.searchBarValue}
          clearSearchBar={props.clearSearchBar}
        />
        <DropdownList
          isExpanded={props.isExpanded}
          onClick={props.onClick}
          clearFilters={props.clearFilters}
          summary={props.summary}
        />
      </Top>
      <Cards 
        data={props.data}
        onCountryClick={props.onCountryClick}
      />
    </Container>
  );
}

export default Main;