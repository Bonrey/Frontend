import React, {ChangeEvent} from 'react';
import styled from 'styled-components';

import SearchBar from "./SearchBar";
import DropdownList from "./DropdownList";
import Cards from '../Cards';

const Container = styled.main`
  padding: 0 5vw;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
`

interface Props {
  data: object[],
  isExpanded: boolean,
  onClick(region?: string): void,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  summary: string,
  searchBarValue: string
}

const Main: React.FC<Props> = (props) => {
  return (
    <Container>
      <Top>
        <SearchBar 
          onChange={props.onChange}
          searchBarValue={props.searchBarValue}
        />
        <DropdownList 
          isExpanded={props.isExpanded}
          onClick={props.onClick}
          summary={props.summary}
        />
      </Top>
      <Cards data={props.data} />
    </Container>
  );
}

export default Main;