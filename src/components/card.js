import React, { useState, useEffect } from 'react'
// import { usePalette } from 'react-palette'
import { useFetch } from '../utils/useFetch'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledCard = styled(Link)`
  border-radius: 8px;
  padding: 1.5rem;
  height: 264px;
  width: 172px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: box-shadow 0.25s ease;
  scale: 1;
  background-color: white;
  text-decoration: none;
  color: #0f0f0f;
  border: 0.75px solid #131313;
  box-shadow: -10px 10px 0px #d6fdff;

  :hover {
    box-shadow: ;
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

export default function Card({ url, list, customImage }) {
  const [urlType, setUrlType] = useState('ipfs')
  const [tokenlist, loading] = useFetch(url)

  useEffect(() => {
    tokenlist.logoURI && tokenlist.logoURI.substring(0, 4) === 'ipfs'
      ? setUrlType('ipfs')
      : setUrlType('url')
  }, [tokenlist])

  // const { data } = usePalette(
  //   !customImage
  //     ? urlType === 'ipfs'
  //       ? tokenlist.logoURI &&
  //         'https://ipfs.io/ipfs/' + tokenlist.logoURI.split('//')[1]
  //       : '/icons/uni-icon.png'
  //     : '/icons/' + list.icon
  // )

  return (
    <StyledCard
      to={'/token-list?url=' + url}
      className="card"
      style={
        {
          // background: ` radial-gradient(ellipse at top, transparent, ${data.vibrant}),
          // radial-gradient(ellipse at bottom, ${data.vibrant}, transparent)`,
          // border: `1px solid ${data.vibrant}`,
          // color: data.vibrant,
          // boxShadow: ` -8px 8px 0 ${data.vibrant}`,
        }
      }
    >
      <img
        alt="icon"
        src={
          !customImage
            ? urlType === 'ipfs'
              ? tokenlist.logoURI &&
                'https://ipfs.io/ipfs/' + tokenlist.logoURI.split('//')[1]
              : tokenlist.logoURI
              ? tokenlist.logoURI
              : 'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
            : '/icons/' + tokenlist.icon
        }
        onError={(e) => {
          e.target.className = 'replace'
          e.target.src =
            'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
        }}
      />
      <section>
        <h3>{tokenlist.name}</h3>
        {loading ? (
          <TokensListed>loading...</TokensListed>
        ) : (
          <TokensListed>
            {tokenlist.tokens ? tokenlist.tokens.length + ' tokens' : ''}
          </TokensListed>
        )}
      </section>
    </StyledCard>
  )
}
