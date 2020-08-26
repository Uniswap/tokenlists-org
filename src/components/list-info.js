import React from 'react'
import styled from 'styled-components'
import Card from './card'
import Moment from 'react-moment'
import CopyHelper from './copy'

const StyledInfo = styled.section`
  display: grid;
  grid-template-row: 224px 1fr;
  grid-gap: 2rem;
  max-width: 960px;
  box-sizing: border-box;
  padding: 3rem 0;
  min-height: 400px;
  position: sticky;
  top: 3rem;
  height: 400px;
  small {
    font-size: 16px;
    line-height: 150%;
    color: #131313;
  }
`

const InfoDescription = styled.span`
  display: grid;
  grid-gap: 1rem;
  font-size: 1rem;
  max-width: 960px;
  span p {
    margin: 0.25rem 0;
    color: #797878;
  }
`

const Helper = styled.div`
  padding: 0.5rem;
  background-color: #d6fdff;
  color: rgba(0, 0, 0, 0.5);

  border-radius: 8px;
  font-size: 12px;
  max-width: 200px;
`

export default function Info({ url, list }) {
  return (
    <StyledInfo>
      <Card list={list} url={url} customImage={false} />
      <InfoDescription>
        <span className="grid">
          <small style={{ fontWeight: 600 }}>Source URL</small>{' '}
          <CopyHelper toCopy={url} />
          <span>
            <a href={url}>{url}</a>
          </span>
        </span>

        <Helper>
          Use this url to import this list anywhere the token lists
          specification is supported.
        </Helper>

        <span>
          <small>Tokens</small>
          <p>{list.tokens ? list.tokens.length : ''}</p>
        </span>
        <span>
          <small>Last Updated</small>
          <p>
            <Moment fromNow>{list && list.timestamp}</Moment>
          </p>
        </span>
        <span>
          <small>Version</small>
          <p>
            {list.version.major +
              '.' +
              list.version.minor +
              '.' +
              list.version.patch}
          </p>
        </span>
        {/* <span className="grid">
          <a className="button" href={url}>
            View list homepage ↗
          </a>

          <a
            style={{ backgroundColor: '#ff007a' }}
            className="button disabled"
            href={'https://app.uniswap.org/#/' + url}
          >
            Open with Uniswap ↗
          </a>
        </span> */}
      </InfoDescription>
    </StyledInfo>
  )
}
