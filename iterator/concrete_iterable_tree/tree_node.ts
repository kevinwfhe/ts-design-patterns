class MultinaryTreeNode<T> {
  val: T;
  children: (MultinaryTreeNode<T> | null)[];
  constructor(val: T, children: (T | null)[] = []) {
    this.val = val;
    this.children = [];
    for (let child of children) {
      if (child) this.children.push(new MultinaryTreeNode(child));
      else this.children.push(null);
    }
  }
}

class BinaryTreeNode<T> {
  val: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
  constructor(
    val: T,
    left: BinaryTreeNode<T> | null = null,
    right: BinaryTreeNode<T> | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export { MultinaryTreeNode, BinaryTreeNode };
