import React from 'react'
import Card from './card'
import Moment from 'react-moment'

export default function Info({ url, list }) {
  return (
    <section className="info">
      <Card list={list} url={url} customImage={false} />
      <span className="info-description">
        <span className="grid">
          <small>Source URL</small>
          <a href={url}>{url}</a>
        </span>

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
      </span>
    </section>
  )
}
