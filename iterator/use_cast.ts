import { IterableTree } from "./iterable_tree";
import { generateTree } from "./util";


class App {
  private tree: IterableTree<any>;
  constructor() {
    this.tree = generateTree() as unknown as IterableTree<any>; // mocked while test
  }

  // Here 'tree' could be different kinds of tree that implemented the IterableTree interface,
  // which has a 'levelOrder' method in it. The 'levelOrder' method returns a concrete iterator
  // that implements the standard IterableIterator interface.

  // When we iterate the tree with 'tree.levelOrder()', we don't care about which kind of tree
  // it is nor the implementation details of how the level order of the tree is produced.
  printLevelOrder() {
    const order: any[] = [];
    for (let node of this.tree.levelOrder()) {
      order.push(node.val);
    }
    return order.join(",");
  }
}

export { App };
