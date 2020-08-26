import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Info from '../components/list-info'
import Tokens from '../components/list-tokens'
import { useFetch } from '../utils/useFetch'

import { useLocation } from 'react-router-dom'

import '../index.css'

const Content = styled.section`
  display: grid;
  grid-template-columns: 300px 800px;
  grid-gap: 48px;
  position: relative;
  box-sizing: border-box;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    width: 100%;
    grid-gap: 24px;
    padding: 0 1.5rem;
  }
`

const Loading = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export function getURLFromQuery(query) {
  if (query?.startsWith('https://')) {
    return query
  } else if (query?.endsWith('.eth')) {
    return `http://${query}.link`
  } else {
    return null
  }
}

function List() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const search = useLocation()?.search ?? ''
  const query = new URLSearchParams(search).get('url')
  const url = getURLFromQuery(query)
  const [loading, list, error] = useFetch(url)

  return (
    <div className="app">
      <Header back={true} />
      {url === null ? (
        <Loading>
          {query ? <>Invalid URL<code>{query}</code></> : 'Invalid URL'}
        </Loading>
      ) : error ? (
        <Loading>
          <p>Sorry, we're having trouble loading this list.</p>
          <small>
            <a href={url}>{query}</a>
          </small>
        </Loading>
      ) : loading ? (
        <Loading>
          <p>Loading...</p>
        </Loading>
      ) : (
        <Content>
          <Info query={query} url={url} list={list} />
          <Tokens tokens={list.tokens} />
        </Content>
      )}
    </div>
  )
}

export default List
