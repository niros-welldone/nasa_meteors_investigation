import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AutocompleteYear, Input} from '../components';
import {Data, Filter, YearsList} from '../types';
import {getFilteredData} from '../helper';

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

interface Props {
    data: Data[];
    filters?: Filter;
    yearsList: YearsList;
    setFilters: (filters: Filter) => void;
}

const Filters = ({data, filters, yearsList, setFilters}: Props) => {
    const [year, setYear] = useState<number>();
    const [mass, setMass] = useState<number>();

    useEffect(() => {
        const filteredData = getFilteredData(data, filters);
        if (!filteredData.length && year && mass) {
            const found = data.find((item) => (item.mass || 0) >= (mass || 0));
            if (found) {
                const fullYear = new Date(found.year || '').getFullYear();
                if (fullYear !== year) {
                    alert('The mass was not found, jumping to first-year where there is a mass that fits the criteria');
                    setYear(new Date(found.year || '').getFullYear());
                }
            }
        }
    }, [data, filters, mass, year]);

    useEffect(() => {
        setFilters({year, mass});
    }, [setFilters, year, mass]);

    return (
        <Container>
            <AutocompleteYear
                yearsList={yearsList}
                selectedYear={year}
                setYear={setYear}
            />
            <Input
                type="number"
                placeholder="Larger than MASS"
                value={mass || ''}
                onChange={({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setMass(Number(value))}
            />
        </Container>
    )
}

export default Filters;
