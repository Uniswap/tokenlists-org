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
            <p className="title">Why hook lists?</p>

            <p className="description" id="why-lists">
              Hook Lists aim to solve the problem of the Uniswap community creating, discovering and maintaining lists
              of reputable hooks in a way that is inclusive, transparent, decentralized and open source.
            </p>
            <p>
              As the Uniswap ecosystem continues to evolve and mature, we will see sustained 
              growth in the number of Uniswap v4 hooks being created and used by pools.
            </p>
           
            <p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home
