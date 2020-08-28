import React, { useState, memo } from 'react'
import styled from 'styled-components'
import Search from './search'
import CopyHelper from './copy'

import { toChecksumAddress } from 'ethereumjs-util'
import FilterResults from 'react-filter-search'

const TokenItem = styled.section`
  display: grid;
  max-width: 960px;
  grid-gap: 1rem;
  grid-template-columns: 1fr 128px 96px 148px;
  margin-bottom: 1rem;
  a {
    color: #131313;
  }

  @media screen and (max-width: 960px) {
    display: grid;
    max-width: 960px;
    grid-gap: 1rem;
    grid-template-columns: 24px 96px 1fr;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 360px) {
    grid-template-columns: 24px 96px 150px;
  }
`
const TokenInfo = styled.span`
  display: grid;
  grid-template-columns: 16px 1fr;
  grid-gap: 1rem;
  height: fit-content;
  align-items: center;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const TokenIcon = styled.img`
  width: 16px;
  border-radius: 32px;
  background-color: white;
  height: 16px;
`
const TokenTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 960px) {
    display: none;
  }
`

const TokenTag = styled.div`
  font-size: 11px;
  background-color: rgb(230, 230, 230, 0.4);
  color: #858585;
  padding: 0.25rem 0.35rem;
  margin-right: 0.2rem;
  border-radius: 4px;
  height: 14px;
  width: fit-content;
`

const TokenAddress = styled.span`
  display: grid;
  grid-template-columns: auto 16px;
  grid-gap: 0.5rem;
  height: fit-content;
  align-items: center;
`

export const ListItem = memo(function ListItem({ token }) {
  return (
    <TokenItem>
      <TokenInfo>
        <TokenIcon
          className="token-icon"
          alt={`${token.name} token icon`}
          src={
            !token.logoURI
              ? `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${toChecksumAddress(
                  token.address
                )}/logo.png`
              : token.logoURI.startsWith('ipfs')
              ? `https://ipfs.io/ipfs/${token.logoURI.split('//')[1]}`
              : token.logoURI
          }
          onError={(e) => {
            e.target.className = 'replace'
            e.target.src = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
          }}
        />

        <span className="hide-small">
          <a style={{ textAlign: 'right' }} href={`https://etherscan.io/address/${toChecksumAddress(token.address)}`}>
            {token.name}
          </a>
        </span>
      </TokenInfo>
      <span>{token.symbol}</span>
      <TokenTagWrapper className="hide-small">
        {token?.tags?.length > 0 && (
          <>
            <TokenTag>{token.tags[0].toUpperCase()}</TokenTag>
            {token.tags.length > 1 && <TokenTag>...</TokenTag>}
          </>
        )}
      </TokenTagWrapper>
      <TokenAddress>
        <a style={{ textAlign: 'right' }} href={`https://etherscan.io/address/${toChecksumAddress(token.address)}`}>
          {`${toChecksumAddress(token.address)?.slice(0, 6)}...${toChecksumAddress(token.address)?.slice(38, 42)}`}
        </a>
        <CopyHelper toCopy={token.address} />
      </TokenAddress>
    </TokenItem>
  )
})

const Title = styled.h1`
  font-size: 48px;
  line-height: 125%;
  @media screen and (max-width: 960px) {
  }
`

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  width: 100%;
  height: fit-content;
  min-height: 60vh;
  margin-bottom: 2rem;
`

const ListWrapper = styled.section`
  @media screen and (max-width: 414px) {
  }
`

const ListTitle = styled.div`
  font-weight: 500;
  color: #1f1f1f80;
  display: grid;
  max-width: 960px;
  grid-gap: 1rem;
  grid-template-columns: 1fr 128px 96px 148px;
  margin-bottom: 1rem;
  @media screen and (max-width: 414px) {
    display: none;
  }
`

const ListHeader = styled.div`
  display: flex;
  align-items: baseline;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`

export default function Tokens({ tokens }) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  return (
    <ListWrapper>
      <ListHeader className="flex-between" style>
        <Title>List Tokens</Title>
        <Search handleChange={handleChange} value={value} setValue={setValue} />
      </ListHeader>

      <TokenWrapper>
        <ListTitle>
          <p className="hide-small">Name</p>
          <p className="hide-small">Symbol</p>
          <p className="hide-small">Tags</p>

          <p className="hide-small" style={{ textAlign: 'right' }}>
            Address
          </p>
        </ListTitle>

        <FilterResults
          value={value}
          data={tokens}
          renderResults={(results) =>
            results.length === 0 ? 'None found!' : results.map((data, i) => <ListItem key={i} token={data} />)
          }
        />
      </TokenWrapper>
    </ListWrapper>
  )
}
