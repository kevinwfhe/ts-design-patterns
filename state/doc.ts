import { Editor } from "./editor";

type DocState = "Draft" | "LocalFile" | "Exported";

abstract class Doc {
  abstract save(): boolean;
  abstract update(text: string): boolean;
  abstract export(): { success: boolean; result?: string; error?: string };
  abstract getState(): DocState;
  abstract getText(): string;
  abstract setEditor(editor: Editor): void;
}

abstract class BaseDoc extends Doc {
  protected text: string;
  protected editorRef: Editor;
  constructor(initialText: string) {
    super();
    this.text = initialText;
  }
  setEditor(editor: Editor) {
    this.editorRef = editor;
  }
  getText(): string {
    return this.text;
  }
}

class DraftDoc extends BaseDoc {
  getState(): DocState {
    return "Draft";
  }
  save() {
    const localDoc = new LocalDoc(this.text);
    this.editorRef.setState(localDoc);
    return true;
  }
  update(text: string) {
    this.text = text;
    return true;
  }
  export() {
    return {
      success: false,
      error: "Cannot export doc before saving",
    };
  }
}

class LocalDoc extends BaseDoc {
  getState(): DocState {
    return "LocalFile";
  }
  save() {
    return true;
  }
  update(text: string) {
    this.editorRef.setState(new DraftDoc(text));
    return true;
  }
  export() {
    this.editorRef.setState(new ExportedDoc(this.text));
    return {
      success: true,
      result: this.text,
    };
  }
}

class ExportedDoc extends BaseDoc {
  getState(): DocState {
    return "Exported";
  }
  save() {
    return false;
  }
  update(text: string) {
    return false;
  }
  export() {
    return {
      success: false,
      error: "Cannot re-export doc",
    };
  }
}

export { Doc, DraftDoc, LocalDoc, ExportedDoc };
