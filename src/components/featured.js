import React from 'react'
import Card from './card'
import { Search } from 'react-feather'
import Moment from 'react-moment'

import { useFetch } from '../utils/useFetch'

import featuredLists from '../utils/featuredlists.json'
import allLists from '../utils/lists.json'

import { Link } from 'react-router-dom'

function ListItem({ list }) {
  const [tokenlist, loading] = useFetch(list.url)

  return (
    <section className="list-item">
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <Link to={'/list?url=' + list.url}>
            <p>{tokenlist.name}</p>
          </Link>
          <p>
            <Moment fromNow>{tokenlist.timestamp}</Moment>
          </p>
          <p>{tokenlist.tokens.length}</p>
        </>
      )}
    </section>
  )
}

export default function Featured() {

  
  return (
    <section className="featured">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h2>Discover Lists</h2>
        <Search size={20} />
      </div>

      <small style={{ width: '100%', maxWidth: '640px', padding: '1rem 0' }}>
        Highlighted Lists
      </small>
      <div className="card-wrapper ">
        {featuredLists.map((list, i) => (
          <Card key={i} url={list.url} list={list} customImage={true} />
        ))}
      </div>

      <div className="lists-wrapper" style={{ marginTop: '4rem' }}>
        <section className="list-item">
          <p>Name</p>
          <p>Last Updated</p>
          <p>Tokens</p>
        </section>
        {allLists.map((list, i) => (
          <ListItem key={i} list={list} />
        ))}
      </div>
    </section>
  )
}
