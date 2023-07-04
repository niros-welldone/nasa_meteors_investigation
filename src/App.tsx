import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import {Filters, Table} from './components';
import {Data, Filter, YearsList} from './types';

const data: Data[] = require('./y77d-th95.json');

const Container = styled.div`
  min-height: 100vh;
  background-color: #282c34;
  padding: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: bold;
  color: white;
`;

const App = () => {
    const yearsList = useMemo<YearsList>(() => (
        [...new Set(data.filter((item) => !!item.year).map((item) => new Date(item.year || '').getFullYear()))]
    ), []);
    const [filters, setFilters] = useState<Filter>();

    return (
        <Container>
            <Title>NASA - meteor landing investigation</Title>
            <Filters data={data} filters={filters} yearsList={yearsList} setFilters={setFilters}/>
            <Table data={data} filters={filters}/>
        </Container>
    );
};

export default App;
