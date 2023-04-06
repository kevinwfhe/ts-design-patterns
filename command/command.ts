import { Editor } from "./text_editor";

abstract class Command {
  backup: string;
  editor: Editor;
  makeBackup() {
    this.backup = this.editor.text;
  }
  undo() {
    this.editor.text = this.backup;
  }
  abstract execute(): boolean;
  // the boolean return value indicates whether a command can be undo
}

class CopyCommand extends Command {
  backup: string;
  editor: Editor;
  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.backup = "";
  }
  execute() {
    this.editor.copySelection();
    return false;
  }
}

class CutCommand extends Command {
  editor: Editor;
  constructor(editor: Editor) {
    super();
    this.editor = editor;
  }
  backup: string;
  execute() {
    this.makeBackup();
    this.editor.cutSelection();
    return true;
  }
}

class PasteCommand extends Command {
  editor: Editor;
  constructor(editor: Editor) {
    super();
    this.editor = editor;
  }
  execute() {
    this.makeBackup();
    this.editor.pasteSelection();
    return true;
  }
}

interface ConstrucableCommand<Command> {
  new (editor: Editor): Command;
}

class CommandFactory {
  CommandClass: ConstrucableCommand<CopyCommand | CutCommand | PasteCommand>;
  constructor(cls: CommandFactory["CommandClass"]) {
    this.CommandClass = cls;
  }
  create(editor: Editor) {
    return new this.CommandClass(editor);
  }
}

class CommandHistory {
  history: Command[];
  constructor() {
    this.history = [];
  }
  push(cmd: Command) {
    this.history.push(cmd);
  }
  pop() {
    return this.history.pop();
  }
}

export {
  Command,
  CopyCommand,
  CutCommand,
  PasteCommand,
  CommandHistory,
  CommandFactory,
};
