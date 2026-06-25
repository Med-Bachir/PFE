import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useSelector } from 'react-redux';
import { colorAccentDark, colorAccentDarkTransparent, colorAccentMain, colorAccentMedium, colorAccentMediumTransparent, colorBackgroundBlack, colorPrimaryBlack, grayBackground, main, primaryTextColor, transparentMain, whiteTextColor } from '../Colors';

const StaticTitle = styled.span`
  font-size: 20px;
  border-left:4px solid ${props => props.mode == "light" ? main : colorAccentMain};
color:${props => props.mode == "light" ? primaryTextColor : whiteTextColor};

  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-items: center;
`;
const Input = styled.input`
border: none;
outline: none;
width: 90%;
padding: 0 16px;
font-size: 16px;

background-color:${props => props.mode == "light" ? whiteTextColor : colorAccentDarkTransparent};
color:${props => props.mode == "light" ? primaryTextColor : whiteTextColor};

`
const Search = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  height: 40px;
  border-radius: 4px;
border: 1px solid ${props => props.mode == "light" ? grayBackground : colorBackgroundBlack};
background-color:${props => props.mode == "light" ? whiteTextColor : colorPrimaryBlack};
`;

const SearchComponent = ({ data, onSearch , type}) => {
  const mode = useSelector(state => state.theme.mode);
  const [searchValue, setSearchValue] = useState('');
  const [rows, setRows] = useState(data);

  const handleSearch = (searchedVal) => {
    setSearchValue(searchedVal);
  
    if (!searchedVal) {
      setRows(data); // Reset rows if search is cleared
      if (onSearch) onSearch(data);
      return;
    }
  
    let key = '';
  
    switch (type) {
      case 'Users':
      case 'Sellers':
        key = 'username';
        break;
      case 'Shops':
        key = 'ShopName';
        break;
      case 'Products':
        key = 'productname';
        break;
      case 'Categories':
        key = 'name';
        break;
      default:
        key = '';
    }
    
  
    const filteredRows = data?.filter((row) =>
      row[key]?.toLowerCase().includes(searchedVal.toLowerCase())
    );
  
    setRows(filteredRows);
  
    if (onSearch) {
      onSearch(filteredRows);
    }
  };
  return (
    <>
      <StaticTitle mode={mode}>{type}</StaticTitle>
      <Search mode={mode}>
        <IconButton
          sx={{
            backgroundColor: mode === 'light' ? main : colorAccentMedium,
            width: '10%',
            height: '100%',
            borderRadius: '4px 0 0 4px',
            padding:'0 30px',
            "&:hover" : {
            backgroundColor: mode === 'light' ? transparentMain : colorAccentMediumTransparent,

            }

          }}
        >
          <PersonSearchIcon style={{ color: 'white' }} />
        </IconButton>
        <Input
          mode={mode}
          placeholder="Enter Seller Name"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Search>
    </>
  );
};

export default SearchComponent;
