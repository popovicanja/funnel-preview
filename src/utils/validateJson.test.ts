import { Funnel } from "../types/funnel";
import { validateUploadedJSON } from "./validateJson";

describe("validateUploadedJSON", () => {
  test("should return error for invalid JSON format", () => {
    const result = validateUploadedJSON("invalid json");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Invalid JSON format.");
    expect(result.data).toBeNull();
  });

  test("should return error when 'pages' property is missing", () => {
    const json = JSON.stringify({ name: "Test Funnel", bgColor: "#fff" });
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Missing 'pages' array in the JSON.");
    expect(result.data).toBeNull();
  });

  test("should return error when 'pages' is not an array", () => {
    const json = JSON.stringify({ pages: {} });
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Missing 'pages' array in the JSON.");
    expect(result.data).toBeNull();
  });

  test("should return error when 'pages' array is empty", () => {
    const json = JSON.stringify({ pages: [] });
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Missing 'pages' array in the JSON.");
    expect(result.data).toBeNull();
  });

  test("should warn when a page is missing an id", () => {
    const funnel = {
      name: "Test Funnel",
      bgColor: "#fff",
      pages: [
        {
          // id is missing
          blocks: [
            {
              // block missing id
              type: "text",
              text: "hello",
              color: "red",
              align: "center",
            },
          ],
        },
      ],
    };
    const json = JSON.stringify(funnel);
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();

    expect(result.warnings).toContain("Page 0 is missing an id.");
    expect(result.warnings).toContain("Block in page 0 is missing an id.");
    expect(result.data).toEqual(funnel);
  });

  test("should return error when a page is missing a blocks array", () => {
    const funnel = {
      name: "Test Funnel",
      bgColor: "#fff",
      pages: [
        {
          id: "page1",
          // blocks array is missing
        },
      ],
    };
    const json = JSON.stringify(funnel);
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("is missing a blocks array.");
    expect(result.data).toBeNull();
  });

  test("should warn for blocks with unsupported type", () => {
    const funnel = {
      name: "Test Funnel",
      bgColor: "#fff",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "block1",
              type: "video", // unsupported type
              text: "hello",
              color: "red",
              align: "center",
            },
          ],
        },
      ],
    };
    const json = JSON.stringify(funnel);
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
    expect(result.warnings).toContain(
      "Block in page page1 has unsupported type 'video'."
    );
    expect(result.data).toEqual(funnel);
  });

  test("should warn when a list block is missing an items array", () => {
    const funnel = {
      name: "Test Funnel",
      bgColor: "#fff",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "block1",
              type: "list",
              // missing items array
            },
          ],
        },
      ],
    };
    const json = JSON.stringify(funnel);
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
    expect(result.warnings).toContain(
      "List block in page page1 is missing an items array."
    );
    expect(result.data).toEqual(funnel);
  });

  test("should warn when an item in a list block is missing an id", () => {
    const funnel = {
      name: "Test Funnel",
      bgColor: "#fff",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "block1",
              type: "list",
              items: [
                {
                  // missing id
                  title: "Item 1",
                  description: "desc",
                  src: "img.png",
                },
              ],
            },
          ],
        },
      ],
    };
    const json = JSON.stringify(funnel);
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
    expect(result.warnings).toContain(
      "Item in list block in page page1 is missing an id."
    );
    expect(result.data).toEqual(funnel);
  });

  test("should validate a correct funnel JSON without warnings", () => {
    const funnel: Funnel = {
      name: "Test Funnel",
      bgColor: "#fff",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "block1",
              type: "text",
              text: "hello",
              color: "red",
              align: "center",
            },
            {
              id: "block2",
              type: "image",
              src: "image.png",
              alt: "an image",
            },
            {
              id: "block3",
              type: "button",
              text: "Click",
              color: "white",
              bgColor: "blue",
            },
            {
              id: "block4",
              type: "list",
              items: [
                {
                  id: "item1",
                  title: "Item 1",
                  description: "desc",
                  src: "img.png",
                },
              ],
            },
          ],
        },
      ],
    };
    const json = JSON.stringify(funnel);
    const result = validateUploadedJSON(json);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
    expect(result.warnings.length).toBe(0);
    expect(result.data).toEqual(funnel);
  });
});
