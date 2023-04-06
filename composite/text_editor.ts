class Block {
  children: Array<Block | TextBlock>;
  constructor(children: Block["children"] = []) {
    this.children = children;
  }
  add(block: Block | TextBlock) {
    this.children.push(block);
  }
  get textContent() {
    return this.children
      .map((block) => (block instanceof Block ? block.textContent : block.text))
      .join("\n");
  }
}

class TextBlock {
  text: string;
  constructor(text: string = "") {
    this.text = text;
  }
  edit(newText: string) {
    this.text = newText;
  }
}

class Editor extends Block {
  constructor() {
    super();
  }
  clear() {
    this.children = [];
  }
  resolve(path: number[]) {
    let block: Editor | Block | TextBlock = this;
    for (let i = 0; i < path.length; i++) {
      if (block instanceof Block) {
        block = block.children[path[i]];
      } else break; // end if current block is a TextBlock
    }
    return block;
  }
}

export { Editor, Block, TextBlock };
