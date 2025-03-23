import React from "react";
import { ImageBlock as ImageBlockType } from "../../types/funnel";
import { applyDefaultValues, imagePlaceholder } from "../../utils/consts";

interface ImageBlockProps {
  block: ImageBlockType;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
  const blockValues = applyDefaultValues<ImageBlockType>(
    imagePlaceholder,
    block
  );

  return (
    <div className="mb-4" data-testid={`funnel-${block.type}-block`}>
      <img
        src={blockValues.src}
        alt={blockValues.alt || "Funnel image"}
        className="w-full"
      />
    </div>
  );
};
