import React from 'react'
import logo from '../logo.gif'
import list from '../list.png'

export default function Header() {
  return (
    <section className="hero">
      <img className="icon" src={logo} alt="token lists icon" />
      <h2>Token Lists</h2>
      <p className="description">
        Token Lists aim to solve the problem of the Ethereum community creating,
        discovering and maintaining lists of reputable tokens in a way that is
        inclusive, transparent, decentralized and open source.
      </p>
      <img className="list" src={list} alt="list screenshot" />
    </section>
  )
}
