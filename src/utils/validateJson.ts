import { Funnel } from "../types/funnel";

const SUPPORTED_BLOCK_TYPES = ["text", "image", "list", "button"];

export type Validation = {
  error: string | null;
  valid: boolean;
  warnings: string[];
  data: Funnel | null;
};

export function validateUploadedJSON(json: string): Validation {
  let data: Funnel;
  const warnings: string[] = [];

  try {
    data = JSON.parse(json);
  } catch {
    return {
      valid: false,
      error: "Invalid JSON format.",
      warnings,
      data: null,
    };
  }

  if (!data.pages || !Array.isArray(data.pages) || data.pages.length === 0) {
    return {
      valid: false,
      error: "Missing 'pages' array in the JSON.",
      warnings,
      data: null,
    };
  }

  for (const [pageIndex, page] of data.pages.entries()) {
    if (!page.id) {
      warnings.push(`Page ${pageIndex} is missing an id.`);
    }
    if (
      !page.blocks ||
      !Array.isArray(page.blocks) ||
      page.blocks.length === 0
    ) {
      return {
        valid: false,
        error: `Page ${page.id || pageIndex} is missing a blocks array.`,
        warnings,
        data: null,
      };
    } else {
      page.blocks.forEach((block) => {
        if (!block.id) {
          warnings.push(
            `Block in page ${page.id || pageIndex} is missing an id.`
          );
        }
        if (!SUPPORTED_BLOCK_TYPES.includes(block.type)) {
          warnings.push(
            `Block in page ${page.id || pageIndex} has unsupported type '${
              block.type
            }'.`
          );
        }

        if (block.type === "list") {
          if (
            !block.items ||
            !Array.isArray(block.items) ||
            block.items.length === 0
          ) {
            warnings.push(
              `List block in page ${
                page.id || pageIndex
              } is missing an items array.`
            );
          } else {
            block.items.forEach((item) => {
              if (!item.id) {
                warnings.push(
                  `Item in list block in page ${
                    page.id || pageIndex
                  } is missing an id.`
                );
              }
            });
          }
        }
      });
    }
  }

  return {
    valid: true,
    error: null,
    warnings,
    data,
  };
}
