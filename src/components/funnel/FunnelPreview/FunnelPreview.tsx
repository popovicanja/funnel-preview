import React from "react";
import { Funnel } from "../../../types/funnel";
import { usePagination } from "../../../hooks/usePagination";
import { NavArrow, PageCount } from "../PaginationComponents";
import { funnelNamePlaceholder } from "../../../utils/consts";
import { BlockRenderer } from "../BlockRenderer/BlockRenderer";

interface FunnelPreviewProps {
  funnel: Funnel;
}

export const FunnelPreview: React.FC<FunnelPreviewProps> = ({ funnel }) => {
  const { name: nameValue, bgColor = "#ffffff" } = funnel || {};

  const funnelName = nameValue?.trim() ? nameValue : funnelNamePlaceholder;

  const {
    currentPageIndex,
    goToNextPage,
    goToPrevPage,
    totalPages,
    isFirstPage,
    isLastPage,
  } = usePagination({
    totalPages: funnel.pages.length,
  });

  const currentPage = funnel.pages[currentPageIndex];

  return (
    <div
      data-testid="funnel-preview-container"
      className="flex flex-col items-center p-4 md:p-8"
      style={{ background: bgColor }}
    >
      <h2 className="text-xl font-semibold py-2 mb-4">{funnelName}</h2>

      <div className="w-full md:w-[375px] h-[600px] border border-gray-200 rounded-lg overflow-y-auto shadow-lg bg-white">
        {currentPage.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <NavArrow
          dataTestId="funnel-previous-page-button"
          direction="left"
          onClick={goToPrevPage}
          disabled={isFirstPage}
        />

        <PageCount currentPage={currentPageIndex + 1} totalPages={totalPages} />

        <NavArrow
          dataTestId="funnel-next-page-button"
          direction="right"
          onClick={goToNextPage}
          disabled={isLastPage}
        />
      </div>
    </div>
  );
};
