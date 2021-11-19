import styled from 'styled-components';

interface ITypography {
  text: string;
  color?: string;
  textTransform?: string;
}

const StyledTypography = styled.p`
  color: ${({ color }) => color};
`;

export const Typography = ({
  text,
  color = 'rgb(195, 197, 203);',
}: ITypography) => {
  return <StyledTypography color={color}>{text}</StyledTypography>;
};
