import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import FilterResults from 'react-filter-search'

import Card from './card'
import Search from './search'
import tokenLists from '../token-lists.json'
import { useMultiFetch } from '../utils/useMultiFetch'
import { ListItem } from '../components/list-tokens'
import { toChecksumAddress } from 'ethereumjs-util'

const listIDs = Object.keys(tokenLists)

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
  cursor: pointer;
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

  // fetch lists
  const lists = useMultiFetch(listIDs)

  // format list data for search, using names from fetched lists if available, while falling back to hard-coded names
  const listData = useMemo(
    () => listIDs.map((listID) => ({ id: listID, name: lists[listID].list?.name ?? tokenLists[listID].name })),
    [lists]
  )

  // get all unique tokens, and all data associated with them from each list
  const tokens = useMemo(() => {
    // short-circuit until all list data has been returned
    if (
      Object.values(lists)
        .map(({ loading }) => loading)
        .some((loading) => loading)
    ) {
      return {}
    }

    const allTokens = {}

    for (const listID of Object.keys(lists)) {
      const tokensInList = lists[listID].list?.tokens ?? []
      for (const token of tokensInList) {
        const address = toChecksumAddress(token.address)
        const existingEntry = allTokens[address] ?? { tokens: [], listIDs: [] }
        allTokens[address] = {
          tokens: existingEntry['tokens'].concat([token]),
          listIDs: existingEntry['listIDs'].concat([listID]),
        }
      }
    }
    return allTokens
  }, [lists])

  const tokenData = useMemo(
    () =>
      Object.keys(tokens).map((tokenAddress) => {
        const { tokens: listTokens } = tokens[tokenAddress]
        const uniqueNames = Array.from(new Set(listTokens.map(({ name }) => name)))
        const uniqueSymbols = Array.from(new Set(listTokens.map(({ symbol }) => symbol)))

        return { address: tokenAddress, name: uniqueNames.join(' '), symbol: uniqueSymbols.join(' ') }
      }),
    [tokens]
  )

  return (
    <StyledAllLists>
      <Search handleChange={handleChange} value={value} setValue={setValue} />

      {/* <h1>Lists</h1> */}

      <CardWrapper>
        <FilterResults
          value={value}
          data={listData}
          renderResults={(results) =>
            results.length === 0
              ? 'None found!'
              : results.map((result) => (
                  <Card key={result.id} id={result.id} list={lists[result.id]?.list} name={result.name} />
                ))
          }
        />
      </CardWrapper>

      {value?.length > 2 && (
        <>
          <h1>Tokens</h1>

          <FilterResults
            value={value}
            data={tokenData}
            renderResults={(results) =>
              results.length === 0
                ? 'None found!'
                : results.map((data) => <ListItem key={data.address} token={tokens[data.address].tokens[0]} />)
            }
          />
        </>
      )}

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Uniswap/tokenlists-org/issues/new?assignees=&labels=list-request&template=add-list-request.md&title=Request%3A+add+%7BList+name%7D"
      >
        <AddButton>+ add a list</AddButton>
      </a>
    </StyledAllLists>
  )
}
