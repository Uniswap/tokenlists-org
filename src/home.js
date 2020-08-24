import React, { useEffect } from 'react'
import Header from './components/header'
import Hero from './components/hero'
import Featured from './components/featured'
import Footer from './components/footer'

import './index.css'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="app">
      <Header />
      <div className="home-content">
        <Hero />
        <Featured />
      </div>
      <Footer />
    </div>
  )
}

export default Home
