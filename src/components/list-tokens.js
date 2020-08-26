import React, { useState, useEffect } from 'react'
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

function ListItem({ token }) {
  const [urlType, setUrlType] = useState('')

  useEffect(() => {
    token.logoURI && token.logoURI.substring(0, 4) === 'ipfs'
      ? setUrlType('ipfs')
      : setUrlType('url')
  }, [token.logoURI])

  const tag = token.tags ? token.tags[0] : undefined

  return (
    <TokenItem>
      <TokenInfo>
        {token.logoURI ? (
          <TokenIcon
            className="token-icon"
            src={
              urlType === 'ipfs'
                ? token.logoURI &&
                  'https://ipfs.io/ipfs/' + token.logoURI.split('//')[1]
                : token.logoURI
            }
            alt={token.name + ' token icon'}
            onError={(e) => {
              e.target.className = 'replace'
              e.target.src =
                'https://systemuicons.com/images/icons/question_circle.svg'
            }}
          />
        ) : (
          <TokenIcon
            className="token-icon"
            src={
              'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/' +
              toChecksumAddress(token.address) +
              '/logo.png'
            }
            onError={(e) => {
              e.target.className = 'replace'
              e.target.src =
                'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
            }}
            alt={token.name + ' token icon'}
          />
        )}
        <span className="hide-small">
          {' '}
          <a
            style={{ textAlign: 'right' }}
            href={
              'https://etherscan.io/address/' + toChecksumAddress(token.address)
            }
          >
            {token.name}
          </a>
        </span>
      </TokenInfo>
      <span>{token.symbol}</span>
      <TokenTagWrapper className="hide-small">
        {tag !== undefined && (
          <>
            <TokenTag>{tag.toUpperCase()}</TokenTag>
            {token.tags.length > 1 && <TokenTag>...</TokenTag>}
            {/* {token.tags &&
          token.tags.map((data, i) => (
            <TokenTag>{data.toUpperCase()}</TokenTag>
          ))} */}
          </>
        )}
      </TokenTagWrapper>
      <TokenAddress>
        <a
          style={{ textAlign: 'right' }}
          href={
            'https://etherscan.io/address/' + toChecksumAddress(token.address)
          }
        >
          {toChecksumAddress(token.address)?.slice(0, 6) +
            '...' +
            toChecksumAddress(token.address)?.slice(38, 42)}
        </a>
        <CopyHelper toCopy={token.address} />
      </TokenAddress>
    </TokenItem>
  )
}

const Title = styled.h1`
  font-size: 48px;
  line-height: 125%;
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

const ListTitle = styled.div`
  font-weight: 500;
  color: #1f1f1f80;
  display: grid;
  max-width: 960px;
  grid-gap: 1rem;
  grid-template-columns: 1fr 128px 96px 148px;
  margin-bottom: 1rem;
`

const ListHeader = styled.div`
  display: flex;
  align-items: baseline;
`

export default function Tokens({ tokens }) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  return (
    <section>
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
          renderResults={(results) => (
            <div>
              {results.map((data, i) => (
                <ListItem key={i} token={data} />
              ))}
            </div>
          )}
        />
      </TokenWrapper>
    </section>
  )
}
