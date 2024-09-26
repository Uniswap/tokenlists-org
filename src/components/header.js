import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../logo/color.png'

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  backdrop-filter: blur(20px);
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.01);
  border-bottom: 0.75px solid #13131320;

  a {
    color: #0f0f0f;
  }
  .title {
    font-size: 1.25rem;
    font-family: 'MatterSQ-SemiBold';
  }

  @media screen and (max-width: 640px) {
    position: relative;
  }
`

const Nav = styled.nav`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  width: fit-content;

  > * {
    margin-left: 1rem;
  }
`

const ButtonLink = styled.a`
  transition: box-shadow 0.25s ease, translate 0.25s ease;
  background-color: #010101;
  border-radius: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.65rem;
  color: white;
  font-size: 14px;
  scale: 1;
  :hover {
    box-shadow: -6px 6px 0px #d6fdff;
    translate: 1px -1px;
  }
`

export default function Header({ back }) {
  return (
    <StyledHeader>
      <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
        <img width={32} src={logo} alt="logo" />
        <span className="title" style={{ marginLeft: '.5rem' }}>
          DAO Attestation List
        </span>
      </Link>

      <Nav>
        <a target="_blank" rel="noopener noreferrer" className="hide-small" href="http://community.tokenlists.org/">
          Community
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hide-small"
          href="https://uniswap.org/blog/token-lists/"
        >
          Why lists?
        </a>
        <a
          className="hide-small"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Uniswap/token-lists#authoring-token-lists"
        >
          Make a list
        </a>

        <ButtonLink
          className="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Uniswap/token-lists"
        >
          <img
            style={{
              filter: 'invert(1)',
              width: 16,
              marginRight: 8,
            }}
            src="https://raw.githubusercontent.com/feathericons/feather/master/icons/github.svg"
            alt="github icon"
          />
          <span style={{ color: 'white' }}>GitHub</span>
        </ButtonLink>
      </Nav>
    </StyledHeader>
  )
}
