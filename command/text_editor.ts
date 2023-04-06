import {
  CommandHistory,
  CopyCommand,
  CutCommand,
  PasteCommand,
  CommandFactory,
} from "./command";

class Editor {
  text: string;
  clipboard: string | null;
  commandHistory: CommandHistory;
  copyCommand: () => void;
  cutCommand: () => void;
  pasteCommand: () => void;
  private selection: [number, number] | null;
  constructor(text: string = "") {
    this.text = text;
    this.clipboard = null;
    this.selection = null;
    this.commandHistory = new CommandHistory();
    this.copyCommand = this.executeCommand(new CommandFactory(CopyCommand));
    this.cutCommand = this.executeCommand(new CommandFactory(CutCommand));
    this.pasteCommand = this.executeCommand(new CommandFactory(PasteCommand));
  }

  executeCommand(cmdFactory: CommandFactory) {
    return () => {
      const cmd = cmdFactory.create(this);
      if (cmd.execute()) {
        this.commandHistory.push(cmd);
      }
    };
  }

  undo() {
    const command = this.commandHistory.pop();
    if (command !== null) {
      command.undo();
    }
  }

  setSelection(range: [number, number]) {
    this.selection = range;
  }
  copySelection() {
    const [start, end] = this.selection;
    const selectionText = this.text.substring(start, end + 1);
    this.clipboard = selectionText;
  }
  cutSelection() {
    const [start, end] = this.selection;
    const preSelection = this.text.substring(0, start);
    const selectionText = this.text.substring(start, end + 1);
    const postSelection = this.text.substring(end + 1);
    this.text = preSelection + postSelection;
    this.selection = null;
    this.clipboard = selectionText;
  }
  pasteSelection() {
    if (this.clipboard === null) {
      return;
    }
    const [pasteAt] = this.selection;
    const preSelection = this.text.substring(0, pasteAt);
    const postSelection = this.text.substring(pasteAt + 1);
    this.text = preSelection + this.clipboard + postSelection;
  }
}

export { Editor };
