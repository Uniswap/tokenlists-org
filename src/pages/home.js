import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Hero from '../components/hero'
import AllLists from '../components/allLists'

import '../index.css'

const Content = styled.div`
  display: grid;
  grid-template-columns: 460px 1fr;
  grid-gap: 48px;
  position: relative;
  box-sizing: border-box;
`

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="app">
      <Header />
      <Content>
        <Hero />
        <AllLists />
      </Content>
    </div>
  )
}

export default Home
