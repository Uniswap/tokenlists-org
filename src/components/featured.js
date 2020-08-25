import React, { useState } from 'react'
import Card from './card'
import Moment from 'react-moment'
import { Search, X } from 'react-feather'

import FilterResults from 'react-filter-search'

import { useFetch } from '../utils/useFetch'

import tokenLists from '../utils/token-lists.json'

import { Link } from 'react-router-dom'

function ListItem({ list }) {
  const [tokenlist, loading] = useFetch(list.url)

  return (
    <section className="list-item">
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <Link to={'/token-list?url=' + list.url}>
            <p>{tokenlist.name}</p>
          </Link>
          <p>
            <Moment fromNow>{tokenlist.timestamp}</Moment>
          </p>
          <p style={{ textAlign: 'right' }}>{tokenlist.tokens.length}</p>
        </>
      )}
    </section>
  )
}

export default function Featured() {
  const [value, setValue] = useState('')

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  return (
    <section className="featured">
      {/* <small style={{ width: '100%', maxWidth: '640px', padding: '1rem 0' }}>
        Highlighted Lists
      </small> */}
      <div className="card-wrapper ">
        {tokenLists.map((list, i) => (
          <Card key={i} url={list.url} list={list} customImage={true} />
        ))}
      </div>

      <div className="lists-wrapper" style={{ marginTop: '4rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <p className="description">Discover Lists</p>
          <form className="search">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e)}
            />

            {value === '' ? (
              <Search
                style={{
                  marginLeft: '-32px',
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
        <section className="list-item list-title">
          <p>Name</p>
          <p>Last Updated</p>
          <p style={{ textAlign: 'right' }}>Tokens</p>
        </section>

        <FilterResults
          value={value}
          data={tokenLists}
          renderResults={(results) => (
            <div>
              {results.map((data, i) => (
                <ListItem key={i} list={data} />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  )
}
