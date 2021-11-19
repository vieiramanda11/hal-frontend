import React from 'react';
import styled from 'styled-components';
import { Typography } from '.';

interface IFilter {
  handleSelect: (event: { target: { value: string } }) => void;
}

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  background-color: rgb(25, 27, 31);
  color: white;
  height: 30px;
  margin-left: 20px;
  width: 90px;
  padding: 0 5px;
`;

export const Filter = ({ handleSelect }: IFilter) => {
  const types = ['swaps', 'mints', 'burns'];
  return (
    <Container>
      <Typography text='Transactions' />
      <Select name='category' onChange={handleSelect}>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
    </Container>
  );
};
