import React from 'react'
import styled from 'styled-components'
import { Search as SearchIcon, X } from 'react-feather'

const StyledSearch = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  input {
    border: none;
    background-color: transparent;
    border: 0.5px solid #838383;
    font-size: 14px;
    text-align: left;
    padding: 8px;
    padding-left: 2rem;
    width: 164px;

    border: 0.5px solid #838383;
    border-radius: 8px;
  }
  @media screen and (max-width: 414px) {
    width: 100%;

    input {
      width: 100%;
    }
  }

  input:focus {
    background-color: white;
  }
`

export default function Search({ handleChange, value, setValue }) {
  return (
    <StyledSearch className="search">
      <SearchIcon
        color={'#838383'}
        style={{
          marginLeft: '8px',
          pointerEvents: 'none',
          position: 'absolute',
        }}
        size={16}
      />
      <input placeholder="Search" type="text" value={value} onChange={(e) => handleChange(e)} />

      {value !== '' ? (
        <X
          style={{
            marginLeft: '-24px',
            cursor: 'pointer',
          }}
          onClick={() => setValue('')}
          size={20}
        />
      ) : (
        <X
          style={{
            marginLeft: '-24px',
            cursor: 'pointer',
            opacity: 0,
          }}
          onClick={() => setValue('')}
          size={20}
        />
      )}
    </StyledSearch>
  )
}
