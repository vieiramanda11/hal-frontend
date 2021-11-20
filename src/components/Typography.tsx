import styled from 'styled-components';

interface ITypography {
  text?: string;
  color?: string;
  bold?: boolean;
}

const StyledTypography = styled.p<ITypography>`
  color: ${({ color }) => color};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

export const Typography = ({
  text,
  color = 'rgb(195, 197, 203);',
  bold,
}: ITypography) => {
  return (
    <StyledTypography color={color} bold={bold}>
      {text}
    </StyledTypography>
  );
};
