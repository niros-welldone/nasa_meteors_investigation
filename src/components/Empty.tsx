import React from 'react';
import styled from 'styled-components';

const Text = styled.b`
  color: rosybrown;
`;

const Empty = () => {
    return (
        <Text>
            You must to select year first or modify the mass filter...
        </Text>
    )
};

export default Empty;
