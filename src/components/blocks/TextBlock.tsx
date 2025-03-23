import React from "react";
import { TextBlock as TextBlockType } from "../../types/funnel";
import { applyDefaultValues, textPlaceholder } from "../../utils/consts";

interface TextBlockProps {
  block: TextBlockType;
}

export const TextBlock: React.FC<TextBlockProps> = ({ block }) => {
  const blockValues = applyDefaultValues<TextBlockType>(textPlaceholder, block);
  return (
    <div className="my-4 px-4" data-testid={`funnel-${block.type}-block`}>
      <p
        style={{ color: blockValues.color }}
        className={`text-${blockValues.align}`}
      >
        {blockValues.text}
      </p>
    </div>
  );
};
