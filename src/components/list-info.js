import React from 'react'
import styled from 'styled-components'
import Card from './card'
import Moment from 'react-moment'
import CopyHelper from './copy'
import { getListURLFromListID } from '../utils/useMultiFetch'

const StyledInfo = styled.section`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  max-width: 960px;
  box-sizing: border-box;
  padding: 3rem 0;
  min-height: 400px;
  position: sticky;
  top: 3rem;
  height: 400px;

  small {
    font-size: 16px;
    line-height: 150%;
    color: #131313;
  }

  @media screen and (max-width: 960px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    position: relative;
    align-items: flex-start;
    min-height: initial;
    top: initial;
    margin-top: 2rem;
    height: fit-content;
    padding: 0;
  }

  @media screen and (max-width: 414px) {
    grid-template-columns: max-content;
    width: 100%;
    max-width: 320px;
    overflow: hidden;
  }
`

const InfoDescription = styled.span`
  display: grid;
  grid-gap: 1rem;
  font-size: 1rem;
  max-width: 260px;
  span p {
    margin: 0.25rem 0;
    color: #797878;
  }

  @media screen and (max-width: 960px) {
    max-width: initial;
    max-width: 260px;
  }
`

const Helper = styled.div`
  padding: 0.5rem;
  background-color: #d6fdff;
  color: rgba(0, 0, 0);
  border-radius: 8px;
  font-size: 14px;
`

export default function Info({ listID, list }) {
  return (
    <StyledInfo>
      <Card id={listID} list={list} />
      <InfoDescription>
        <span className="grid">
          <small style={{ fontWeight: 600 }}>
            Source <CopyHelper toCopy={listID} />
          </small>
          <span>
            <a href={getListURLFromListID(listID)}>{listID}</a>
          </span>
        </span>

        <Helper>Copy to import this list anywhere Token Lists are supported.</Helper>

        <span>
          <small>Last Updated</small>
          <p>
            <Moment fromNow>{list && list.timestamp}</Moment>
          </p>
        </span>
        <span>
          <small>Version</small>
          <p>{`${list.version.major}.${list.version.minor}.${list.version.patch}`}</p>
        </span>
      </InfoDescription>
    </StyledInfo>
  )
}
