import React, { useState, useEffect } from 'react'
import { usePalette } from 'react-palette'

import { useFetch } from '../utils/useFetch'
import { Link } from 'react-router-dom'

export default function Card({ url, list, customImage }) {
  const [urlType, setUrlType] = useState('ipfs')

  useEffect(() => {
    list.logoURI && list.logoURI.substring(0, 4) === 'ipfs'
      ? setUrlType('ipfs')
      : setUrlType('url')
  }, [list])

  const [tokenlist, loading] = useFetch(url)
  const { data } = usePalette(
    !customImage
      ? urlType === 'ipfs'
        ? list.logoURI && 'https://ipfs.io/ipfs/' + list.logoURI.split('//')[1]
        : '/icons/uni-icon.png'
      : '/icons/' + list.icon
  )

  return (
    <Link
      to={'/list?url=' + url}
      className="card"
      style={{ backgroundColor: data.vibrant }}
    >
      <img
        alt="icon"
        src={
          urlType === 'ipfs'
            ? list.logoURI &&
              'https://ipfs.io/ipfs/' + list.logoURI.split('//')[1]
            : '/icons/' + list.icon
        }
        onError={(e) => {
          e.target.className = 'replace'
          e.target.src =
            'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
        }}
      />
      <section>
        <h3>{list.name}</h3>
        {loading ? (
          <span>loading...</span>
        ) : (
          <small>
            {tokenlist.tokens ? tokenlist.tokens.length + ' tokens' : ''}
          </small>
        )}
      </section>
    </Link>
  )
}
