abstract class IterableTree<T> {
  root: T | null;
  abstract levelOrder: () => IterableIterator<T>;
}

export { IterableTree };
