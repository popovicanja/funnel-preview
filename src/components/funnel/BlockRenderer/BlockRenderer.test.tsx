import { render, screen } from "@testing-library/react";
import {
  TextBlock,
  ButtonBlock,
  ListBlock,
  ImageBlock,
  Block,
} from "../../../types/funnel";
import { BlockRenderer } from "./BlockRenderer";

describe("BlockRenderer", () => {
  test("renders TextBlock for text type", () => {
    const textBlock: TextBlock = {
      id: "1",
      type: "text",
      text: "Hello World",
      color: "#000000",
      align: "center",
    } as const;

    render(<BlockRenderer block={textBlock} />);

    expect(screen.getByTestId("funnel-text-block")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("renders ImageBlock for image type", () => {
    const imageBlock: ImageBlock = {
      id: "2",
      type: "image",
      src: "image.jpg",
      alt: "Test image",
    } as const;

    render(<BlockRenderer block={imageBlock} />);

    expect(screen.getByTestId("funnel-image-block")).toBeInTheDocument();
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "image.jpg");
  });

  test("renders ButtonBlock for button type", () => {
    const buttonBlock: ButtonBlock = {
      id: "3",
      type: "button",
      text: "Click me",
      color: "#FFFFFF",
      bgColor: "#007BFF",
    } as const;

    render(<BlockRenderer block={buttonBlock} />);

    expect(screen.getByTestId("funnel-button-block")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("renders ListBlock for list type", () => {
    const listBlock: ListBlock = {
      id: "4",
      type: "list",
      items: [
        {
          id: "item1",
          title: "Item 1",
          description: "Description 1",
          src: "image.jpg",
        },
      ],
    } as const;

    render(<BlockRenderer block={listBlock} />);

    expect(screen.getByTestId("funnel-list-block")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  test("renders nothing for unknown block type", () => {
    const unknownBlock = {
      id: "5",
      type: "unknown",
    } as unknown as Block;

    const { container } = render(<BlockRenderer block={unknownBlock} />);
    expect(container.firstChild).toBeNull();
  });
});
