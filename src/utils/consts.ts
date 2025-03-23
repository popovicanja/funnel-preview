import {
  ButtonBlock,
  ImageBlock,
  ListBlock,
  ListItem,
  TextBlock,
} from "../types/funnel";

export const funnelNamePlaceholder = "{Your Funnel Name}";
export const buttonPlaceholder: ButtonBlock = {
  id: "placeholder",
  type: "button",
  text: "{Your Button Label}",
  color: "#ffffff",
  bgColor: "#8d51ff",
};

export const textPlaceholder: TextBlock = {
  id: "placeholder",
  type: "text",
  text: "{Your Text}",
  color: "#000000",
  align: "center",
};

export const listItemPlaceholder: ListItem = {
  id: "placeholder",
  title: "{Your List Item}",
  description: "{your item description}",
  src: "",
};

export const listBlockPlaceholder: ListBlock = {
  id: "placeholder",
  type: "list",
  items: [listItemPlaceholder],
};

export const imagePlaceholder: ImageBlock = {
  id: "placeholder",
  type: "image",
  alt: "{You Image}",
  src: "",
};

export const applyDefaultValues = <T extends object>(
  defaultValues: T,
  data: Partial<T>
): T =>
  Object.fromEntries(
    Object.keys(defaultValues).map((key) => {
      const k = key as keyof T;
      return [
        key,
        data[k] === undefined || data[k] === null || data[k] === ""
          ? defaultValues[k]
          : data[k],
      ];
    })
  ) as T;
