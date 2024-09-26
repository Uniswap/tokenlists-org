import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import FilterResults from 'react-filter-search';

import Card from './card';
import Search from './search';

const apiUrl = "https://attestation-list-api.onrender.com/schema_attestations/0x25eb07102ee3f4f86cd0b0c4393457965b742b8acc94aa3ddbf2bc3f62ed1381";

const StyledAllLists = styled.section`
  min-height: 80vh;
  width: 100%;
  padding: 5rem 0 6rem 0;
  display: grid;
  gap: 24px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  @media screen and (max-width: 960px) {
    padding: 0;
    align-items: flex-start;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 720px;
  min-width: 720px;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 960px) {
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 414px) {
    display: flex;
    flex-wrap: wrap;
    max-width: initial;
    min-width: initial;
    grid-template-columns: 1fr;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function AllLists() {
  const [value, setValue] = useState('');
  const [attestations, setAttestations] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    const fetchAttestations = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAttestations(data);
      } catch (error) {
        console.error('Failed to fetch attestations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttestations();
  }, []);

  // Memoize the formatted data for rendering
  const data = useMemo(() => {
    return attestations.map(attester => ({
      id: attester.attesterAddress,
      name: attester.issuerName,
      description: attester.issuerDescription,
      logo: attester.logo.trim(),
      apiDocsURI: attester.apiDocsURI,
      schemas: attester.schemas
    }));
  }, [attestations]);

  return (
    <StyledAllLists>
      <Search handleChange={handleChange} value={value} setValue={setValue} />

      <CardWrapper>
        {loading ? (
          <Loader><div className="loader"></div></Loader>
        ) : (
          <FilterResults
            value={value}
            data={data}
            renderResults={(results) =>
              results.length === 0
                ? 'None found!'
                : results.map((result) => (
                    <Card key={result.id} data={result} />
                  ))
            }
          />
        )}
      </CardWrapper>
    </StyledAllLists>
  );
}
