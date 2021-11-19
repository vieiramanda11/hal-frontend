import React from 'react';
import { usePagination } from '../hooks/usePagination';
import styled from 'styled-components';
import { Typography } from '.';

interface IPagination {
  onPageChange: Function;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  cursor: pointer;
`;

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: IPagination) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    (paginationRange?.length && paginationRange.length < 2)
  ) {
    return null;
  }

  const lastPage =
    paginationRange?.length && paginationRange[paginationRange.length - 1];

  const onNext = () => {
    lastPage !== currentPage && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage !== 1 && onPageChange(currentPage - 1);
  };

  return (
    <Container>
      <ButtonContainer onClick={onPrevious}>
        <StyledTypography text={'<'} />
      </ButtonContainer>
      <StyledTypography text={`Page ${currentPage} of ${lastPage}`} />
      <ButtonContainer onClick={onNext}>
        <StyledTypography text={'>'} />
      </ButtonContainer>
    </Container>
  );
};
