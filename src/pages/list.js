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

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function List() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let query = useQuery()
  let linkedURL =
    query.get('url').split('.')[2] === 'eth' &&
    query.get('url').split('.')[3] !== 'link'
      ? `http://${query.get('url')}.link/`
      : query.get('url')

  const [data, loading, error] = useFetch(linkedURL)

  return (
    <div className="app">
      <Header back={true} />
      {loading ? (
        <Loading>
          {error ? (
            <>
              <p>Sorry, I'm having trouble loading this list :(</p>
              <small>
                <a href={linkedURL}>{linkedURL}</a>
              </small>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Loading>
      ) : (
        <>
          <Content>
            <Info url={linkedURL} list={data} />
            <Tokens tokens={data.tokens} />
          </Content>
        </>
      )}
    </div>
  )
}

export default List
