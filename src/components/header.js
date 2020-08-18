import React from 'react'

import { Link } from 'react-router-dom'

export default function Header({ back }) {
  return (
    <header className="header">
      {back ? <Link to="/">{'<-'}</Link> : <span>Token Lists</span>}

      <nav className="nav">
        <Link to="/why">Why lists?</Link>
        <Link to="/how">Make a list</Link>
        <a href="https://github.com/Uniswap/token-lists">Github</a>
      </nav>
    </header>
  )
}
