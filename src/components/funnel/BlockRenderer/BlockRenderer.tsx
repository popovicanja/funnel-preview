import React from "react";
import { Block } from "../../../types/funnel";
import { TextBlock } from "../../blocks/TextBlock";
import { ImageBlock } from "../../blocks/ImageBlock";
import { ButtonBlock } from "../../blocks/ButtonBlock";
import { ListBlock } from "../../blocks/ListBlock";

interface BlockRendererProps {
  block: Block;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "button":
      return <ButtonBlock block={block} />;
    case "list":
      return <ListBlock block={block} />;
    default:
      return <></>;
  }
};
