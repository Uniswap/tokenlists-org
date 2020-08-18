import React, { useState, useEffect } from 'react'
import { Search as SearchIcon } from 'react-feather'
import { useFuzzy } from 'react-use-fuzzy'

import { toChecksumAddress } from 'ethereumjs-util'

function ListItem({ token }) {
  const [urlType, setUrlType] = useState('ipfs')

  useEffect(() => {
    token.logoURI && token.logoURI.substring(0, 4) === 'ipfs'
      ? setUrlType('ipfs')
      : setUrlType('url')
  }, [token])

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
        <span>{token.name}</span>
      </span>
      <span>{token.symbol}</span>
      <a
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
  const [filteredTokens, setFilteredTokens] = useState(tokens)

  const { result, keyword, search } = useFuzzy(filteredTokens, {
    keys: ['name'],
  })

  return (
    <section className="featured" style={{ marginTop: '4rem' }}>
      <div className="flex-between">
        <h2>Tokens</h2>
        <input
          type="text"
          placeholder="Search tokens"
          value={keyword}
          onChange={(e) => search(e.target.value)}
        />
        <SearchIcon size={20} />
      </div>

      <div className="token-wrapper" style={{ marginTop: '1rem' }}>
        <section className="token-item">
          <p>Name</p>
          <p>Symbol</p>
          <p>Address</p>
        </section>

        {result.length > 0
          ? result.map((token, i) => console.log(token.item))
          : tokens.map((token, i) => <ListItem key={i} token={token} />)}
      </div>
    </section>
  )
}
