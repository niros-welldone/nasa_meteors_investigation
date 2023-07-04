import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {Input} from '../components';
import {YearsList} from '../types';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;

const List = styled.ul`
  position: absolute;
  top: 30px;
  left: 7px;
  right: 7px;
  background-color: white;
  max-height: 200px;
  overflow: scroll;
  list-style-type: none;
  padding-inline-start: 0;
`;

const ListItem = styled.li`
  padding: 5px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    background-color: whitesmoke;
  }
`;

interface Props {
    yearsList: YearsList;
    selectedYear?: number;
    setYear: (year: number) => void;
}

const AutocompleteYear = ({yearsList, selectedYear, setYear}: Props) => {
    const [showingList, setShowingList] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const availableYears = useMemo<YearsList>(() => (
        yearsList.filter((year) => text && year.toString().includes(text))
    ), [yearsList, text]);

    useEffect(() => {
        if (selectedYear) {
            setText(selectedYear.toString());
            setShowingList(false);
        }
    }, [selectedYear]);

    const onChange = useCallback(({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setText(value);
        setShowingList(true);
    }, []);

    return (
        <Container>
            <Input
                type="number"
                placeholder="Select a year"
                value={text}
                onChange={onChange}
            />
            {!!(showingList && availableYears.length) && (
                <List>
                    {availableYears.map((year, index) => (
                        <ListItem key={index} onClick={() => setYear(year)}>{year}</ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default AutocompleteYear;
