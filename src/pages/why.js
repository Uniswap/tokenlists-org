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
            <small style={{ marginTop: '4rem', marginBottom: '1rem' }}>A DAOstar project</small>
            <p className="title">Why DAO Attestation list?</p>

            <p className="description" id="why-lists">
              DAO Attestation Lists aim to solve the problem of the Ethereum community creating, discovering and maintaining lists
              of reputable DAO-related attestations in a way that is inclusive, transparent, decentralized and open source.
            </p>
            <p>
              As the Ethereum ecosystem continues to evolve and mature, we are continuing to see sustained exponential
              growth in the adoption of EIP-4824 being created and used by participants of the network.
            </p>
            <p>
              This is an exciting success of permissionless innovation enabled by the open nature of blockchain
              networks. Ethereum continues to prove out to be the most attractive platform for innovative projects in
              decentralized finance. This is not surprising because it has the best tooling and ecosystem, making it the
              best place for developers and entrepreneurs to build, as well as the most attractive place for users
              because of the diversity of products and rapidly improving tools.
            </p>
            <h2>The tradeoffs of permissionless innovation</h2>
            <p>
              The permissionless nature of Ethereum and the ease of creating tokens also comes with tradeoffs. Since
              there are no central gatekeepers, it becomes up to the users and projects in the space to establish trust
              and reputation, as well as perform actions of moderation. How can users tell credible projects from scams?
            </p>
            <p>
              Uniswap is a token marketplace that faces the issues of token reputation directly. Until now, the Uniswap
              team took on the responsibility of curating the tokens that show up in the Uniswap Interface. While this
              was important to get the project off the ground and protect the users of Uniswap, having the Uniswap team
              curate tokens that show up in the interface was never considered a viable long-term strategy.
            </p>
            <p>
              The ability to moderate token inclusion carries too much power and responsibility in a single gatekeeper.
              That power residing solely in the Uniswap team was against the ethos of the protocol and the broader DeFi
              ecosystem.
            </p>
            <h2>Enter Token lists</h2>
            <p>
              The goal of Token Lists is to enable trust to emerge around reputable tokens in a way that is aligned with
              the values of decentralization.
            </p>
            <p>
              The Ethereum community is known for solving problems as an ecosystem. Today exist numerous reputable
              projects who are responsible for maintaining trustworthy lists of token projects. Until now, there hasn’t
              been a standard, interoperable way for those projects to codify those lists and share them with the
              broader community.
            </p>
            <p>
              Token Lists is a new json schema standard that enables exactly this. Projects can encode lists of
              reputable tokens in a machine readable way. Anyone can make a list. These lists can then be imported into
              the Uniswap interface.
            </p>
            <p>
              We imagine Token Lists being an important building block for the Ethereum ecosystem to self-govern
              reputation around tokens and hope to see token lists used in other projects, as well as an ecosystem of
              tools, dashboards, and discussion forums to emerge around them.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home
