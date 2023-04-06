import { describe, test, expect } from "@jest/globals";
import { Editor } from "./text_editor";

describe("Command", () => {
  test("Cut and paste", () => {
    const editor = new Editor("First version");
    expect(editor.text).toEqual("First version");
    editor.setSelection([0, 5]);
    editor.cutCommand();
    expect(editor.text).toEqual("version");
    editor.setSelection([7, 7]);
    editor.pasteCommand();
    expect(editor.text).toEqual("versionFirst ");
  });

  test("Copy and paste", () => {
    const editor = new Editor("First version");
    expect(editor.text).toEqual("First version");
    editor.setSelection([0, editor.text.length]);
    editor.copyCommand();
    expect(editor.text).toEqual("First version");
    editor.setSelection([13, 13]);
    editor.pasteCommand();
    expect(editor.text).toEqual("First versionFirst version");
  });

  test("Paste before cut/copy", () => {
    const editor = new Editor("First version");
    editor.setSelection([13, 13]);
    editor.pasteCommand();
    expect(editor.text).toEqual("First version");
  });

  test("Undo", () => {
    const editor = new Editor("First version");
    editor.setSelection([0, 5]);
    editor.cutCommand();
    expect(editor.text).toEqual("version");
    editor.undo();
    expect(editor.text).toEqual("First version");

    editor.setSelection([0, 5]);
    editor.cutCommand();
    editor.setSelection([0, 6]);
    editor.cutCommand();
    expect(editor.text).toEqual("");
    editor.undo();
    expect(editor.text).toEqual("version");
    editor.undo();
    expect(editor.text).toEqual("First version");

    editor.setSelection([13, 13]); // last position
    editor.pasteCommand()
    expect(editor.text).toEqual("First versionversion");
    editor.undo();
    expect(editor.text).toEqual("First version");
  });
});
