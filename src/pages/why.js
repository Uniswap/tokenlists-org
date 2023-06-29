import React, { useEffect } from 'react'
import Header from '../components/header'

import '../index.css'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="app">
      <Header />
      <div className="home-content">
        <div>
          <section className="hero">
            <small style={{ marginTop: '4rem', marginBottom: '1rem' }}>A Uniswap project</small>
            <p className="title">Why tokens lists?</p>

            <p className="description" id="why-lists">
              Token Lists aim to solve the problem of the Ethereum community creating, discovering and maintaining lists
              of reputable tokens in a way that is inclusive, transparent, decentralized and open source.
            </p>
            <p>
              As the Uniswap ecosystem continues to evolve and mature, we will see sustained growth in the number of
              Uniswap v4 hooks being created and used by pools.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home
