import React from 'react'
import Header from './components/header'
import Hero from './components/hero'
import Featured from './components/featured'
import Footer from './components/footer'

import './index.css'

function Home() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Featured />
      <Footer />
    </div>
  )
}

export default Home
