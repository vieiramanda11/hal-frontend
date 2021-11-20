import React from 'react';
import styled from 'styled-components';

interface IButton {
  text: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  height: 50px;
  background-color: rgb(25, 27, 31);
  color: white;
  border-radius: 10px;
  margin-right: 10px;
  border: 1px solid white;
  padding: 0 10px;
  text-transform: uppercase;
`;

export const Button = ({ onClick, text }: IButton) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};
