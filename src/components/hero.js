import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <section className="hero">
      <small style={{ marginTop: '4rem', marginBottom: '1rem' }}>
        A Uniswap project
      </small>

      <p className="title">
        A new <b>Ethereum</b> token list standard.
      </p>
      {/* <img className="list" src={list} alt="list screenshot" /> */}

      <a className="button" href="https://github.com/Uniswap/token-lists">
        <img
          style={{ filter: 'invert(1)', width: 16, marginRight: 8 }}
          src="https://raw.githubusercontent.com/feathericons/feather/master/icons/github.svg"
          alt="github icon"
        />
        View list specification{' '}
      </a>

      <p style={{ marginTop: '2rem' }} className="description" id="why-lists">
        Token Lists aim to solve the problem of the Ethereum community creating,
        discovering and maintaining lists of reputable tokens in a way that is
        inclusive, transparent, decentralized and open source.
      </p>

      <Link style={{ marginTop: '.5rem', width: 'fit-content' }} to="/why">
        Why token lists?
      </Link>
      <a
        style={{ marginTop: '.5rem', width: 'fit-content' }}
        href="https://github.com/Uniswap/token-lists#authoring-token-lists"
      >
        Learn how to make your own.
      </a>
    </section>
  )
}
