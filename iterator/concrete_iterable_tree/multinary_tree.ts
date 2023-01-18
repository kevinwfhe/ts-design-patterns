import { IterableTree } from "../iterable_tree";
import { MultinaryTreeLevelOrderIterator } from "../concrete_tree_iterator/multinary_tree_iterator";
import { MultinaryTreeNode } from "./tree_node";

export class MultinaryTree<T> implements IterableTree<MultinaryTreeNode<T>> {
  root: MultinaryTreeNode<T> | null;

  constructor(tree: Map<T, (T | null)[]> | null, root: T | null) {
    if (!tree || tree.size === 0 || root === null) {
      this.root = null;
      return this;
    }
    this.root = new MultinaryTreeNode<T>(root, tree.get(root));
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift() as MultinaryTreeNode<T>;
      for (let child of node.children) {
        if (child === null) continue;
        const childrenOfChild = tree.get(child.val) ?? [];
        for (let c of childrenOfChild) {
          if (c !== null) {
            child.children.push(new MultinaryTreeNode(c));
            queue.push(child);
          } else {
            child.children.push(null);
          }
        }
      }
    }
  }
  levelOrder(): IterableIterator<MultinaryTreeNode<T>> {
    return new MultinaryTreeLevelOrderIterator(this);
  }
}


