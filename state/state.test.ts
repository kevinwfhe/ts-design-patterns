import { describe, test, expect } from "@jest/globals";
import { Editor } from "./editor";

describe("State", () => {
  test("Draft saved as local file", () => {
    const editor = new Editor("");
    editor.edit("123");
    editor.save();
    expect(editor.getState()).toBe("LocalFile");
    expect(editor.getText()).toBe("123");
  });

  test("Local file become draft after editing", () => {
    const editor = new Editor("");
    editor.save();
    expect(editor.getState()).toBe("LocalFile");
    editor.edit("123");
    expect(editor.getState()).toBe("Draft");
    expect(editor.getText()).toBe("123");
  });

  test("Doc cannot be exported before saving", () => {
    const editor = new Editor("123");
    expect(editor.export()).toBe("Cannot export doc before saving");
    editor.save();
    expect(editor.export()).toBe("123");
  });

  test("Exported doc cannot be saved, edit, or export again", () => {
    const editor = new Editor("");
    editor.save();
    editor.export();
    expect(editor.getState()).toBe("Exported");

    expect(editor.edit("123")).toBeFalsy();
    expect(editor.save()).toBeFalsy();
    expect(editor.export()).toBe("Cannot re-export doc");
  });

  test("Auto save when closing editor", () => {
    const editor = new Editor("");
    editor.edit("123");
    editor.close();
    expect(editor.getState()).toBe("LocalFile");
  });

  test("Saving localDoc nothing happen", () => {
    const editor = new Editor("");
    editor.save();
    expect(editor.getState()).toBe("LocalFile");
    expect(editor.getText()).toBe("");
    expect(editor.save()).toBeTruthy();
    expect(editor.getState()).toBe("LocalFile");
    expect(editor.getText()).toBe("");
  });
});
