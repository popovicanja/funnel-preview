import { render, screen, fireEvent } from "@testing-library/react";
import { usePagination } from "../../../hooks/usePagination";
import { funnelNamePlaceholder } from "../../../utils/consts";
import { Funnel } from "../../../types/funnel";
import { FunnelPreview } from "./FunnelPreview";

jest.mock("../../../hooks/usePagination");
jest.mock("../BlockRenderer/BlockRenderer", () => ({
  __esModule: true,
  BlockRenderer: jest.fn(() => <div data-testid="block-renderer" />),
}));

describe("FunnelPreview", () => {
  // Mock functions for pagination
  const mockGoToNextPage = jest.fn();
  const mockGoToPrevPage = jest.fn();

  let currentPageIndex = 0;

  beforeEach(() => {
    jest.clearAllMocks();
    currentPageIndex = 0;

    // Default mock implementation for the pagination hook
    (usePagination as jest.Mock).mockImplementation(() => ({
      currentPageIndex: currentPageIndex,
      goToNextPage: mockGoToNextPage,
      goToPrevPage: mockGoToPrevPage,
      totalPages: 2,
      isFirstPage: currentPageIndex === 0,
      isLastPage: currentPageIndex === 1,
    }));
  });

  const mockFunnel: Funnel = {
    name: "Test Funnel",
    bgColor: "#f5f5f5",
    pages: [
      {
        id: "page1",
        blocks: [
          {
            id: "block1",
            type: "text",
            text: "Hello",
            color: "#000000",
            align: "center",
          },
          {
            id: "block2",
            type: "button",
            text: "Click me",
            color: "white",
            bgColor: "red",
          },
        ],
      },
      {
        id: "page2",
        blocks: [{ id: "block3", type: "image", src: "image.jpg" }],
      },
    ],
  };

  test("renders funnel name correctly", () => {
    render(<FunnelPreview funnel={mockFunnel} />);
    expect(screen.getByText("Test Funnel")).toBeInTheDocument();
  });

  test("uses placeholder name when name is missing", () => {
    const noNameFunnel = { ...mockFunnel, name: "" };
    render(<FunnelPreview funnel={noNameFunnel} />);
    expect(screen.getByText(funnelNamePlaceholder)).toBeInTheDocument();
  });

  test("applies background color from funnel", () => {
    render(<FunnelPreview funnel={mockFunnel} />);
    const funnelEl = screen.getByTestId("funnel-preview-container");
    expect(funnelEl).toHaveStyle("background: #f5f5f5");
  });

  test("renders correct blocks for current page", () => {
    render(<FunnelPreview funnel={mockFunnel} />);

    const renderedBlocks = screen.getAllByTestId("block-renderer");
    expect(renderedBlocks).toHaveLength(2);
  });

  test("navigates between pages when pagination buttons are clicked", () => {
    (usePagination as jest.Mock).mockImplementation(() => ({
      currentPageIndex,
      goToNextPage: jest.fn().mockImplementation(() => {
        currentPageIndex = 1;
        rerender(<FunnelPreview funnel={mockFunnel} />);
      }),
      goToPrevPage: jest.fn().mockImplementation(() => {
        currentPageIndex = 0;
        rerender(<FunnelPreview funnel={mockFunnel} />);
      }),
      totalPages: 2,
      isFirstPage: currentPageIndex === 0,
      isLastPage: currentPageIndex === 1,
    }));

    const { rerender } = render(<FunnelPreview funnel={mockFunnel} />);

    // Initially on page 1 - verify blocks
    const initialBlocks = screen.getAllByTestId("block-renderer");
    expect(initialBlocks).toHaveLength(2);
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    // Navigate to page 2
    const nextButton = screen.getByTestId("funnel-next-page-button");
    fireEvent.click(nextButton);

    // Update mock for new page state
    (usePagination as jest.Mock).mockImplementation(() => ({
      currentPageIndex,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn().mockImplementation(() => {
        currentPageIndex = 0;
        rerender(<FunnelPreview funnel={mockFunnel} />);
      }),
      totalPages: 2,
      isFirstPage: currentPageIndex === 0,
      isLastPage: currentPageIndex === 1,
    }));

    // Verify we're on page 2
    const page2Blocks = screen.getAllByTestId("block-renderer");
    expect(page2Blocks).toHaveLength(1);
    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    // Navigate back to page 1
    const prevButton = screen.getByTestId("funnel-previous-page-button");
    fireEvent.click(prevButton);

    // Update mock for new page state
    (usePagination as jest.Mock).mockImplementation(() => ({
      currentPageIndex,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
      totalPages: 2,
      isFirstPage: currentPageIndex === 0,
      isLastPage: currentPageIndex === 1,
    }));

    // Verify we're back on page 1
    const finalBlocks = screen.getAllByTestId("block-renderer");
    expect(finalBlocks).toHaveLength(2);
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  test("disables previous button on first page", () => {
    currentPageIndex = 0;
    (usePagination as jest.Mock).mockReturnValue({
      currentPageIndex,
      goToNextPage: mockGoToNextPage,
      goToPrevPage: mockGoToPrevPage,
      totalPages: 2,
      isFirstPage: true,
      isLastPage: false,
    });

    render(<FunnelPreview funnel={mockFunnel} />);

    const prevButton = screen.getByTestId("funnel-previous-page-button");
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass("opacity-20");
  });

  test("disables next button on last page", () => {
    currentPageIndex = 1;
    (usePagination as jest.Mock).mockReturnValue({
      currentPageIndex,
      goToNextPage: mockGoToNextPage,
      goToPrevPage: mockGoToPrevPage,
      totalPages: 2,
      isFirstPage: false,
      isLastPage: true,
    });

    render(<FunnelPreview funnel={mockFunnel} />);

    const nextButton = screen.getByTestId("funnel-next-page-button");
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass("opacity-20");
  });

  test("usePagination is called with correct parameters", () => {
    render(<FunnelPreview funnel={mockFunnel} />);
    expect(usePagination).toHaveBeenCalledWith({
      totalPages: 2,
    });
  });
});
