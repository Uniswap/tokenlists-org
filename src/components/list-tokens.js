import React, { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'react-feather'
import { toChecksumAddress } from 'ethereumjs-util'
import FilterResults from 'react-filter-search'

function ListItem({ token }) {
  const [urlType, setUrlType] = useState('')

  useEffect(() => {
    token.logoURI && token.logoURI.substring(0, 4) === 'ipfs'
      ? setUrlType('ipfs')
      : setUrlType('url')
  }, [])

  return (
    <section className="token-item">
      <span className="token-info">
        {token.logoURI ? (
          <img
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
          <img
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
        <span className="hide-small">{token.name}</span>
      </span>
      <span className="hide-small">
        {token.tags &&
          token.tags.map((data, i) => (
            <div className="tag">{data.toUpperCase()}</div>
          ))}
      </span>

      <span>{token.symbol}</span>
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
    </section>
  )
}

export default function Tokens({ tokens }) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  return (
    <section className="featured">
      <div className="flex-between">
        <h3>List Tokens</h3>
        <form className="search">
          <input
            type="text"
            value={value}
            // placeholder={'Filter tokens...'}
            onChange={(e) => handleChange(e)}
          />

          {value === '' ? (
            <SearchIcon
              style={{
                marginLeft: '-24px',
                pointerEvents: 'none',
              }}
              size={20}
            />
          ) : (
            <X
              style={{
                marginLeft: '-24px',
                cursor: 'pointer',
              }}
              onClick={() => setValue('')}
              size={20}
            />
          )}
        </form>
      </div>

      <div className="token-wrapper" style={{ marginTop: '1rem' }}>
        <section className="list-title token-item ">
          <p className="hide-small">Name</p>
          <p className="hide-small">Tags</p>
          <p className="hide-small">Symbol</p>
          <p className="hide-small" style={{ textAlign: 'right' }}>
            Address
          </p>
        </section>

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

        {/* {tokens.map((token, i) => (
          <ListItem key={i} token={token} />
        ))} */}
      </div>
    </section>
  )
}
