import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getURLFromQuery } from '../pages/list'
import { useFetch } from '../utils/useFetch'

const StyledCard = styled(Link)`
  border-radius: 8px;
  padding: 1.5rem;
  height: 264px;
  max-width: 172px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: box-shadow 0.25s ease, translate 0.25s ease;
  scale: 1;
  background-color: white;
  text-decoration: none;
  color: #0f0f0f;
  border: 0.75px solid #131313;
  box-shadow: -8px 8px 0px #d6fdff;

  @media screen and (max-width: 960px) {
    max-width: initial;
  }
  @media screen and (max-width: 414px) {
    width: 100%;
    box-sizing: border-box;
  }
  :hover {
    box-shadow: -12px 12px 0px #d6fdff;
    translate: 2px -2px;
  }

  h3 {
    font-size: 24px;
    line-height: 150%;
  }

  a {
    color: #0f0f0f;
    text-decoration: none;
  }

  img {
    max-width: 64px;
    width: fit-content;
    margin-bottom: 2rem;
  }
`

const TokensListed = styled.span`
  font-size: 14px;
  line-height: 150%;
`

function getLogoURL(logoURI) {
  if (logoURI?.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${logoURI.split('//')[1]}`
  } else if (typeof logoURI === 'string') {
    return logoURI
  } else {
    return null
  }
}

export default function Card({ query, list, name }) {
  // because list is optional, we have to fetch it if not passed
  const url = getURLFromQuery(query)
  const [, fetchedList, error] = useFetch(list ? null : url)

  const actualList = list ?? fetchedList
  const actualName = actualList?.name ?? name 

  const logoURL = getLogoURL(actualList?.logoURI ?? null)

  return (
    <StyledCard to={'/token-list?url=' + query} className="card">
      <img
        alt="icon"
        src={
          logoURL ??
          'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
        }
        onError={(e) => {
          e.target.className = 'replace'
          e.target.src =
            'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
        }}
      />
      <section>
        <h3>{actualName}</h3>
        <TokensListed>
          {actualList?.tokens?.length > 0 ? (
            `${actualList.tokens.length} tokens`
          ) : error ? (
            'Error'
          ) : (
            'Loading...'
          )}
        </TokensListed>
      </section>
    </StyledCard>
  )
}
