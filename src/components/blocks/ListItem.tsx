import React from "react";
import { ListItem as ListItemType } from "../../types/funnel";
import { applyDefaultValues, listItemPlaceholder } from "../../utils/consts";

type ListItemProps = {
  item: ListItemType;
};

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const itemValues = applyDefaultValues<ListItemType>(
    listItemPlaceholder,
    item
  );
  return (
    <li className="flex items-center p-3 bg-white rounded-lg shadow">
      {itemValues.src && (
        <img src={itemValues.src} alt={itemValues.title} className="h-6 mr-4" />
      )}
      <div>
        <h3 className="font-semibold">{itemValues.title}</h3>
        <p className="text-sm text-gray-600">{itemValues.description}</p>
      </div>
    </li>
  );
};
