import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Link)`
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 172px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: box-shadow 0.25s ease, translate 0.25s ease;
  scale: 1;
  background-color: white;
  text-decoration: none;
  color: #0f0f0f;
  border: 0.75px solid #131313;
  box-shadow: -8px 8px 0px #d6fdff;

  @media screen and (max-width: 960px) {
    max-width: initial;
  }
  @media screen and (max-width: 414px) {
    width: 320px;
    box-sizing: border-box;
  }
  :hover {
    box-shadow: -12px 12px 0px #d6fdff;
    translate: 2px -2px;
  }

  h3 {
    font-size: 24px;
    line-height: 150%;
  }

  img {
    max-width: 64px;
    width: fit-content;
    margin-bottom: 2rem;
  }
`;

const DescriptionText = styled.span`
  font-size: 14px;
  line-height: 150%;
`;

const NameText = styled.h3`
  word-wrap: break-word;
`;

function Card({ data, name }) {
  const logoURL = data.logo.startsWith('http') ? data.logo.trim() : `https://via.placeholder.com/150`;

  return (
    <StyledCard to={`/schemas?id=${data.id}`} className="card">
      <img
        alt={`${name} logo`}
        src={logoURL}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <section>
        <NameText>{name}</NameText>
        <DescriptionText>{data.description}</DescriptionText>
      </section>
    </StyledCard>
  );
}

export default Card;
