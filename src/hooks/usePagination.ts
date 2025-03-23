import { useState } from "react";

type UsePaginationProps = {
  totalPages: number;
  initialPage?: number;
};

type UsePaginationResult = {
  currentPageIndex: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export function usePagination({
  totalPages,
  initialPage = 0,
}: UsePaginationProps): UsePaginationResult {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPage);

  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === totalPages - 1;

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return {
    currentPageIndex,
    totalPages,
    goToNextPage,
    goToPrevPage,
    isFirstPage,
    isLastPage,
  };
}
