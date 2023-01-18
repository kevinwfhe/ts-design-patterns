import { BinaryTree } from "../concrete_iterable_tree/binary_tree";
import { BinaryTreeNode } from "../concrete_iterable_tree/tree_node";

class BinaryTreeLevelOrderIterator<T>
  implements IterableIterator<BinaryTreeNode<T>>
{
  queue: BinaryTreeNode<T>[];
  tree: BinaryTree<T>;

  constructor(tree: BinaryTree<T>) {
    this.tree = tree;
    this.queue = [];
    if (this.tree.root !== null) {
      this.queue.push(this.tree.root);
    }
  }

  [Symbol.iterator](): IterableIterator<BinaryTreeNode<T>> {
    return this;
  }
  next(...args: [] | [undefined]): IteratorResult<BinaryTreeNode<T>, any> {
    if (this.queue.length > 0) {
      const node = this.queue.shift() as BinaryTreeNode<T>;
      node.left && this.queue.push(node.left);
      node.right && this.queue.push(node.right);
      return {
        done: false,
        value: node,
      };
    } else
      return {
        done: true,
        value: undefined,
      };
  }
}

export { BinaryTreeLevelOrderIterator };
