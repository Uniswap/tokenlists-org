import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Info from '../components/list-info';
import AttestationList from '../components/list-tokens';
import { useLocation } from 'react-router-dom';

import '../index.css';

const Content = styled.section`
  display: grid;
  grid-template-columns: 300px 800px;
  grid-gap: 48px;
  position: relative;
  box-sizing: border-box;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-gap: 24px;
    padding: 0 1.5rem;
  }
`;

const Loading = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function List() {
  const location = useLocation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttestationData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const attestationId = searchParams.get('id');
        const response = await fetch(`https://attestation-list-api.onrender.com/attestations/${attestationId}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (e) {
        setError('Failed to fetch data.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAttestationData();
  }, [location.search]);

  if (!data && loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error || !data) {
    return <Loading>Error: {error || 'No data found.'}</Loading>;
  }

  return (
    <div className="app">
      <Header back={true} />
      <Content>
        <Info attestation={data} />
        <AttestationList attestations={data.schemas} />
      </Content>
    </div>
  );
}

export default List;
