import React from 'react';
import styled from 'styled-components';
import Card from './card';  // Assuming this Card can be adapted for displaying attestation issuer details
import CopyHelper from './copy';

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
    grid-template-columns: 1fr;
    width: 100%;
    overflow: hidden;
  }
`;

const InfoDescription = styled.div`
  display: grid;
  grid-gap: 1rem;
  font-size: 1rem;
  span {
    margin: 0.25rem 0;
    color: #797878;
  }
`;

const Helper = styled.div`
  padding: 0.5rem;
  background-color: #d6fdff;
  color: #000;
  border-radius: 8px;
  font-size: 14px;
`;

export default function Info({ attestation }) {
  return (
    <StyledInfo>
      <Card data={attestation} /> 
      <InfoDescription>
        <span className="grid">
         API Docs URL
          <span>
            <a href={attestation.apiDocsURI} target="_blank" rel="noopener noreferrer">{attestation.apiDocsURI}</a>
          </span>
        </span>

        {/* <Helper>Copy the API Docs URL to share or reference.</Helper> */}
      
        <span>
          <small>Issuer Name</small>
          <p>{attestation.issuerName}</p>
        </span>
        <span>
          <small>Issuer Description</small>
          <p>{attestation.issuerDescription}</p>
        </span>
      </InfoDescription>
    </StyledInfo>
  );
}
