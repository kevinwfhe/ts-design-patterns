import { MultinaryTree } from "../concrete_iterable_tree/multinary_tree";
import { MultinaryTreeNode } from "../concrete_iterable_tree/tree_node";

class MultinaryTreeLevelOrderIterator<T>
  implements IterableIterator<MultinaryTreeNode<T>>
{
  queue: MultinaryTreeNode<T>[];
  tree: MultinaryTree<T>;

  constructor(tree: MultinaryTree<T>) {
    this.tree = tree;
    this.queue = []
    if (this.tree.root !== null) {
      this.queue.push(this.tree.root);
    }
  }

  [Symbol.iterator](): IterableIterator<MultinaryTreeNode<T>> {
    return this;
  }
  next(...args: [] | [undefined]): IteratorResult<MultinaryTreeNode<T>, any> {
    if (this.queue.length > 0) {
      const node = this.queue.shift() as MultinaryTreeNode<T>;
      for (let child of node.children) {
        child && this.queue.push(child);
      }
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

export { MultinaryTreeLevelOrderIterator };
