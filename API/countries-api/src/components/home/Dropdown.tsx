import React from 'react';
import styled from 'styled-components';

import colors from '../../assets/styles/colors';

const Details = styled.details`
  cursor: pointer;
  background-color: ${colors.light.elements};
  color: ${colors.light.text};
`


const Dropdown = () => {
  return (
    <Details>
      <summary>Filter by Region</summary>
      <span>Africa</span>
    </Details>
  );
}

export default Dropdown;