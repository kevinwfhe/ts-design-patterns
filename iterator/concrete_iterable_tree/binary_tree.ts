import { IterableTree } from "../iterable_tree";
import { BinaryTreeLevelOrderIterator } from "../concrete_tree_iterator/binary_tree_iterator";
import { BinaryTreeNode } from "./tree_node";

export class BinaryTree<T> implements IterableTree<BinaryTreeNode<T>> {
  root: BinaryTreeNode<T> | null;

  constructor(tree: (T | null)[]) {
    if (tree.length === 0 || !tree[0]) {
      this.root = null;
      return this;
    }
    this.root = new BinaryTreeNode(tree[0]);
    const queue = [this.root];
    for (let i = 1; i < tree.length; ) {
      const node = queue.shift() as BinaryTreeNode<T>;
      const leftVal = tree[i++];
      if (leftVal === null) {
        node.left = null;
      } else {
        node.left = new BinaryTreeNode(leftVal);
        queue.push(node.left);
      }
      const rightVal = tree[i++];
      if (rightVal === null) {
        node.right = null;
      } else {
        node.right = new BinaryTreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }

  levelOrder(): IterableIterator<BinaryTreeNode<T>> {
    return new BinaryTreeLevelOrderIterator(this);
  }
}
