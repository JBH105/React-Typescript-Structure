import { useMemo } from 'react';

export const DOTS = '...';

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    if (totalPageCount <= 1) {
      return [];
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const startPage = leftSiblingIndex;
    const endPage = rightSiblingIndex;

    const pages: Array<number | typeof DOTS> = range(startPage, endPage);

    if (leftSiblingIndex > 2) {
      pages.unshift(DOTS);
      pages.unshift(1);
    } else if (leftSiblingIndex === 2) {
      pages.unshift(1);
    }

    if (rightSiblingIndex < totalPageCount - 1) {
      pages.push(DOTS);
      pages.push(totalPageCount);
    } else if (rightSiblingIndex === totalPageCount - 1) {
      pages.push(totalPageCount);
    }

    return pages;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
