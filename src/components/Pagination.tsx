import React from 'react';
import { usePagination } from '../hooks/usePagination';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
  align-items: center;
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
        <FontAwesomeIcon
          icon={faArrowLeft}
          color={currentPage === 1 ? 'gray' : 'white'}
        />
      </ButtonContainer>
      <Typography text={`Page ${currentPage} of ${lastPage}`} />
      <ButtonContainer onClick={onNext}>
        <FontAwesomeIcon
          icon={faArrowRight}
          color={currentPage === lastPage ? 'gray' : 'white'}
        />
      </ButtonContainer>
    </Container>
  );
};
