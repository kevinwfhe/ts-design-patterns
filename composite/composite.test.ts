import { describe, test, expect } from "@jest/globals";
import { Editor, Block, TextBlock } from "./text_editor";

describe("Composite", () => {
  test("Getting text content of the editor", () => {
    const editor = new Editor();
    editor.add(new TextBlock("Line 1"));
    editor.add(
      new Block([
        new TextBlock("Line 2"),
        new Block([new TextBlock("Line 3"), new TextBlock("Line 4")]),
      ]),
    );
    expect(editor.textContent).toBe("Line 1\nLine 2\nLine 3\nLine 4");

    const block = editor.resolve([1, 1, 0]) as TextBlock;
    expect(block.text).toBe("Line 3");

    block.edit("Line 3 edited");
    expect(editor.textContent).toBe("Line 1\nLine 2\nLine 3 edited\nLine 4");

    editor.clear();
    expect(editor.textContent).toBe("");
  });

  test("Block resolve", () => {
    const editor = new Editor();
    editor.add(new TextBlock("Line 1"));
    editor.add(
      new Block([
        new TextBlock("Line 2"),
        new Block([new TextBlock("Line 3"), new TextBlock("Line 4")]),
      ]),
    );

    const line3Block = editor.resolve([1, 1, 0]) as TextBlock;
    expect(line3Block.text).toBe("Line 3");

    const line2Block = editor.resolve([1, 0, 1]) as TextBlock;
    expect(line2Block.text).toBe("Line 2");
  });
});
