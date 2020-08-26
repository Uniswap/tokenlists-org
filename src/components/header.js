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
  /* backdrop-filter: blur(12px); */
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.01);
  a {
    color: #0f0f0f;
  }
  .title {
    font-size: 1.25rem;
    font-family: 'MatterSQ-SemiBold';
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

export default function Header({ back }) {
  return (
    <StyledHeader>
      <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
        <img width={32} src={logo} alt="logo" />
        <span className="title" style={{ marginLeft: '.5rem' }}>
          Token Lists
        </span>
      </Link>

      <Nav>
        <a target="_blank" href="https://uniswap.org/blog/token-lists/">
          Community
        </a>
        <a target="_blank" href="https://uniswap.org/blog/token-lists/">
          Why lists?
        </a>
        <a
          className="hide-small"
          target="_blank"
          href="https://github.com/Uniswap/token-lists#authoring-token-lists"
        >
          Make a list
        </a>

        <a
          className="button"
          style={{ color: 'white  ' }}
          target="_blank"
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
          Github
        </a>
      </Nav>
    </StyledHeader>
  )
}
