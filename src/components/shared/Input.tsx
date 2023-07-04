import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.input`
  padding: 8px;
  border-radius: 5px;
  margin: 5px;
  outline: none;
`;


const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <InputWrapper {...props} />

export default Input;
