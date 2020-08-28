import React, { useState } from 'react'
import styled from 'styled-components'
import Card from './card'
import Search from './search'
import FilterResults from 'react-filter-search'
import tokenLists from '../token-lists.json'

const StyledAllLists = styled.section`
  min-height: 80vh;
  width: 100%;
  padding: 5rem 0 6rem 0;
  display: grid;
  gap: 24px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  @media screen and (max-width: 960px) {
    padding: 0;
    align-items: flex-start;
  }
`

const CardWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 720px;
  min-width: 720px;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 960px) {
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 414px) {
    display: flex;
    flex-wrap: wrap;
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr;
  }
`

const AddButton = styled.button`
  border: 0.75px solid #131313;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  background-color: transparent;
  border-radius: 8px;

  a {
    color: #1f1f1f;
  }
`

export default function AllLists() {
  const [value, setValue] = useState('')

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  return (
    <StyledAllLists>
      <Search handleChange={handleChange} value={value} setValue={setValue} />
      <CardWrapper>
        <FilterResults
          value={value}
          data={tokenLists}
          renderResults={(results) => results.map((list) => <Card key={list.url} query={list.url} name={list.name} />)}
        />
      </CardWrapper>
      <AddButton>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Uniswap/tokenlists-org/issues/new?assignees=&labels=list-request&template=add-list-request.md&title=Request%3A+add+%7BList+name%7D"
        >
          + add a list
        </a>
      </AddButton>
    </StyledAllLists>
  )
}
