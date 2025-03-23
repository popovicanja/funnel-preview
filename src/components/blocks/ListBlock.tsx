import React from "react";
import { ListBlock as ListBlockType } from "../../types/funnel";
import { ListItem } from "./ListItem";
import { applyDefaultValues, listBlockPlaceholder } from "../../utils/consts";

interface ListBlockProps {
  block: ListBlockType;
}

export const ListBlock: React.FC<ListBlockProps> = ({ block }) => {
  const blockValues = applyDefaultValues<ListBlockType>(
    listBlockPlaceholder,
    block
  );
  return (
    <div className="px-4 py-4" data-testid={`funnel-${block.type}-block`}>
      <ul className="space-y-3">
        {blockValues.items.map((item, index) => (
          <ListItem item={item} key={item.id || index} />
        ))}
      </ul>
    </div>
  );
};
