import React, { useEffect } from 'react'
import Header from './components/header'
import Info from './components/list-info'
import Tokens from './components/list-tokens'
import Footer from './components/footer'
import { useFetch } from './utils/useFetch'

import { useLocation } from 'react-router-dom'

import './index.css'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function List() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let query = useQuery()
  const [data, loading, error] = useFetch(query.get('url'))
  return (
    <div className="app">
      <Header back={true} />
      {loading ? (
        <div className="info-loading">
          {error ? (
            <>
              <p>Sorry, I'm having trouble loading this list :(</p>
              <small>
                <a href={query.get('url')}>{query.get('url')}</a>
              </small>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <>
          <div className="content">
            <Info url={query.get('url')} list={data} />
            <Tokens tokens={data.tokens} />
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default List
