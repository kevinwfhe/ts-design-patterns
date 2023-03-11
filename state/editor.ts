import { Doc, DraftDoc } from "./doc";

class Editor {
  private doc: Doc;
  constructor(initialText: string) {
    this.doc = new DraftDoc(initialText);
    this.doc.setEditor(this);
  }
  edit(newText: string) {
    this.doc.update(newText);
  }
  save() {
    return this.doc.save();
  }
  export(): string {
    const { success, result, error } = this.doc.export();
    return success ? (result as string) : (error as string);
  }
  getText() {
    return this.doc.getText();
  }
  getState(): string {
    return this.doc.getState();
  }
  setState(doc: Doc) {
    this.doc = doc;
    this.doc.setEditor(this);
  }
  close() {
    this.save();
  }
}

export { Editor };
