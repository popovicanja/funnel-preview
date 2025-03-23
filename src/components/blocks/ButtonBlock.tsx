import React from "react";
import { ButtonBlock as ButtonBlockType } from "../../types/funnel";
import { applyDefaultValues, buttonPlaceholder } from "../../utils/consts";

interface ButtonBlockProps {
  block: ButtonBlockType;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ block }) => {
  const blockValues = applyDefaultValues<ButtonBlockType>(
    buttonPlaceholder,
    block
  );

  return (
    <div
      className="my-4 px-4 flex justify-center"
      data-testid={`funnel-${block.type}-block`}
    >
      <button
        style={{
          backgroundColor: blockValues.bgColor,
          color: blockValues.color,
        }}
        className="w-full px-6 py-4 text-lg rounded-lg font-medium cursor-pointer hover:shadow-lg hover:bg hover:opacity-90"
      >
        {blockValues.text}
      </button>
    </div>
  );
};
