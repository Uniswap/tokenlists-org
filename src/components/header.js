import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo.png'

export default function Header({ back }) {
  return (
    <header className="header">
      <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
        <img width={32} src={logo} alt="logo" />
        <span style={{ marginLeft: '.5rem' }}>Token Lists</span>
      </Link>

      <nav className="nav">
        <Link className="hide-small" to="/why">
          Why lists?
        </Link>
        <a
          className="hide-small"
          href="https://github.com/Uniswap/token-lists#authoring-token-lists"
        >
          Make a list
        </a>
        <a
          className="button"
          style={{ color: 'white  ' }}
          href="https://github.com/Uniswap/token-lists"
        >
          Github
          <img
            style={{
              filter: 'invert(1)',
              width: 16,
              marginLeft: 8,
            }}
            src="https://raw.githubusercontent.com/feathericons/feather/master/icons/github.svg"
            alt="github icon"
          />
        </a>
      </nav>
    </header>
  )
}
