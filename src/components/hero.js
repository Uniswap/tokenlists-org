import React from 'react'
import styled from 'styled-components'

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6rem;
  position: sticky;
  top: 10rem;
  height: fit-content;

  p {
    text-align: left;
    max-width: 400px;
    font-size: 18px;
  }

  .title {
    text-align: left;
    max-width: 450px;
    font-size: 48px;
    line-height: 125%;
    letter-spacing: 0.002em;
    color: #1f1f1f;
    margin: 0;
    font-family: 'MatterSQ-Medium';
  }

  .icon {
    width: 48px;
  }

  .list {
    max-width: 960px;
  }

  a {
    color: #131313;
    font-family: 'MatterSQ-SemiBold';
  }

  .uniswap {
    color: #ff007a;
    font-family: 'MatterSQ-Regular';
  }

  @media screen and (max-width: 960px) {
    position: relative;
    top: initial;
    margin-top: 2rem;

    .title {
      font-size: 35px;
    }
  }
`

const HoverLink = styled.a`
  transition: box-shadow 0.25s ease, translate 0.25s ease;
  margin-top: 0.5rem;
  width: fit-content;
  :hover {
    box-shadow: -6px 6px 0px #d6fdff;
    translate: 1px -1px;
  }
`

export default function Header() {
  return (
    <Hero>
      <span style={{ marginBottom: '1rem' }}>
        A{' '}
        <a href="https://daostar.org/" className="daostar">
          DAOstar
        </a>{' '}
        Project
      </span>

      <p className="title">An Attestation standard for DAOs.</p>

      <p style={{ fontSize: '20px', lineHeight: '150%' }} className="description" id="why-lists">
        Attestation List is a community-led initiative to improve discoverability, reputation and trust of DAO-related attestations
        in a manner that is inclusive, transparent, and decentralized.
      </p>
      <HoverLink target="_blank" rel="noopener noreferrer" href="https://daostar.com/daoip6">
        {'->'} Why Attestation List?
      </HoverLink>
      <HoverLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Uniswap/token-lists#authoring-token-lists"
      >
        {'->'} Make your own
      </HoverLink>
      <HoverLink target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/PdrPkEZVFk">
        {'->'} Community
      </HoverLink>
    </Hero>
  )
}
