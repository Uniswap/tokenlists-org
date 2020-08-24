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
      to={'/token-list?url=' + url}
      className="card"
      style={{
        // background: ` radial-gradient(ellipse at top, transparent, ${data.vibrant}),
        // radial-gradient(ellipse at bottom, ${data.vibrant}, transparent)`,
        border: `1px solid ${data.vibrant}`,
        color: data.vibrant,
        boxShadow: ` -8px 8px 0 ${data.vibrant}`,
      }}
    >
      <img
        alt="icon"
        src={
          !customImage
            ? urlType === 'ipfs'
              ? list.logoURI &&
                'https://ipfs.io/ipfs/' + list.logoURI.split('//')[1]
              : list.logoURI
              ? list.logoURI
              : 'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
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
          <span>
            {tokenlist.tokens ? tokenlist.tokens.length + ' tokens' : ''}
          </span>
        )}
      </section>
    </Link>
  )
}
