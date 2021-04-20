import React, {ChangeEvent, useEffect, useRef} from 'react';
import searchIcon from '../../assets/icons/search.svg';
import styled from 'styled-components';
import colors from '../../assets/styles/colors';
import clear from '../../assets/icons/clear.svg';

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
  padding: 0 4rem 0 5.5rem;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem hsla(0, 0%, 52%, 0.15),
              0 0 0.2rem hsla(0, 0%, 52%, 0.15),
              0 0 0.3rem hsla(0, 0%, 52%, 0.15);
  
  &::placeholder {
    color: ${colors.light.input};
  }
`

const ClearIcon = styled.img`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;

  &:hover {
    cursor: pointer;
  }
`

type Props = {
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  clearSearchBar(): void,
  searchBarValue: string
}

const SearchBar: React.FC<Props> = ({onChange, clearSearchBar, searchBarValue}) => {
  const inputRef = useRef(null);
  useEffect(() => (inputRef.current as any).focus(), []);

  return (
    <Container>
      <SearchIcon src={searchIcon} alt={"search icon"} />
      <Input
        ref={inputRef}
        type="text"
        aria-label="search for a country"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={searchBarValue}
      />
      {searchBarValue && <ClearIcon 
        src={clear}
        alt="clear search bar icon"
        onClick={_ => clearSearchBar()}
      />}
    </Container>
  );
}

export default SearchBar;