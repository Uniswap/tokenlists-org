import React, { useState } from 'react'
import styled from 'styled-components'
import Card from './card'
import Search from './search'
import FilterResults from 'react-filter-search'
import tokenLists from '../utils/token-lists.json'

const StyledAllLists = styled.section`
  max-width: 640px;
  min-height: 80vh;
  width: 100%;
  padding: 5rem 0 6rem 0;
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  height: fit-content;
`

const CardWrapper = styled.div`
  display: grid;
  max-width: 960px;
  min-width: 50vw;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;
`

export default function AllLists() {
  const [value, setValue] = useState('')
  // const [data, loading, error] = useGetAll()

  // console.log(tokenLists)
  // console.log(data)

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
          renderResults={(results) => (
            <>
              {results.map((list, i) => (
                <Card key={list.url} url={list.url} list={list} />
              ))}
            </>
          )}
        />
      </CardWrapper>
      <a
        target="_blank"
        href="https://github.com/Uniswap/tokenlists-org/issues/new?assignees=&labels=list-request&template=add-list-request.md&title=Request%3A+add+%7BList+name%7D"
      >
        {' '}
        Add a list
      </a>
    </StyledAllLists>
  )
}
