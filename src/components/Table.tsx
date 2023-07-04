import React, {useMemo} from 'react';
import styled from 'styled-components';
import {Empty} from '../components';
import {Data, Filter, Geolocation} from "../types";
import {getFilteredData} from "../helper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TableWrapper = styled.table.attrs({border: 1})`
  width: 100%;
  color: white;

  th, td {
    padding: 6px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  color: white;
`;

const config = [
    {title: 'ID', key: 'id'},
    {title: 'Name', key: 'name'},
    {title: 'Type', key: 'nametype'},
    {title: 'Class', key: 'recclass'},
    {title: 'Mass', key: 'mass'},
    {title: 'Fall', key: 'fall'},
    {title: 'Year', key: 'year', renderer: (data: string) => data && new Date(data).getFullYear()},
    {title: 'Reclat', key: 'reclat'},
    {title: 'Reclong', key: 'reclong'},
    {
        title: 'Geolocation',
        key: 'geolocation',
        renderer: (data: Geolocation) => data && `(${data?.coordinates.join()})`
    },
];

interface Props {
    data: Data[];
    filters?: Filter;
}

const Table = ({data, filters}: Props) => {
    const filteredData = useMemo(() => getFilteredData(data, filters), [data, filters]);
    return (
        <Container>
            <Title>Found {filteredData.length} meteors!</Title>
            {filteredData.length ? (
                <TableWrapper>
                    <thead>
                    <tr>
                        {config.map(({title}, index) => <th key={index}>{title}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            {config.map(({key, renderer}) => {
                                // @ts-ignore
                                const value = item[key];
                                return (
                                    <td key={key}>{renderer ? renderer(value) : value}</td>
                                )
                            })}
                        </tr>
                    ))}
                    </tbody>
                </TableWrapper>
            ) : (
                <Empty/>
            )}
        </Container>
    );
}

export default Table;
