type BlockType = "text" | "image" | "button" | "list";

type BaseBlock = {
  id: string;
  type: BlockType;
};

export interface TextBlock extends BaseBlock {
  type: "text";
  text: string;
  color: string;
  align: string;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  alt?: string;
  src: string;
}

export interface ButtonBlock extends BaseBlock {
  type: "button";
  text: string;
  color: string;
  bgColor: string;
}

export interface ListItem {
  id: string;
  title: string;
  description: string;
  src: string;
}

export interface ListBlock extends BaseBlock {
  type: "list";
  items: ListItem[];
}

export type Block = TextBlock | ImageBlock | ButtonBlock | ListBlock;

export interface FunnelPage {
  id: string;
  blocks: Block[];
}

export interface Funnel {
  name: string;
  bgColor: string;
  pages: FunnelPage[];
}
