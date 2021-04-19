import React, {ChangeEvent} from 'react';
import searchIcon from '../../assets/icons/search.svg';
import styled from 'styled-components';
import colors from '../../assets/styles/colors';

const Container = styled.div`
  font-size: 2rem;
  position: relative;
`

const SearchIcon = styled.img`
  position: absolute;
  left: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
`

const Input = styled.input.attrs(_ => ({
  placeholder: 'Search for a country'
}))`
  background-color: ${colors.light.elements};
  color: ${colors.light.text};
  outline: none;
  border: none;
  width: 30rem;
  line-height: 4rem;
  padding: 0 2rem 0 5.5rem;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem hsl(0, 0%, 52%, 0.1),
              0 0 0.2rem hsl(0, 0%, 52%, 0.1),
              0 0 0.3rem hsl(0, 0%, 52%, 0.1);
  
  &::placeholder {
    color: ${colors.light.input};
  }
`

type Props = {
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  searchBarValue: string
}

const SearchBar: React.FC<Props> = ({onChange, searchBarValue}) => {
  return (
    <Container>
      <SearchIcon src={searchIcon} alt={"search icon"} />
      <Input 
        type={"text"}
        aria-label={"search for a country"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={searchBarValue}
      />
    </Container>
  );
}

export default SearchBar;