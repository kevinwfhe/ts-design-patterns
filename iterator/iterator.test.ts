import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { BinaryTree } from "./concrete_iterable_tree/binary_tree";
import { MultinaryTree } from "./concrete_iterable_tree/multinary_tree";
import { App } from "./use_cast";
import { generateTree } from "./util";

beforeEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

jest.mock("./util");

describe("Iterator", () => {
  test("Iterating binary tree", () => {
    const TREE = [1, 2, 3, null, 4, 5, null];
    //       1
    //   2       3
    // n   4   5   n
    const mockTree = jest.fn(() => new BinaryTree<number>(TREE));
    jest.mocked(generateTree).mockImplementationOnce(mockTree);

    const app = new App();
    const levelOrder = app.printLevelOrder();
    expect(levelOrder).toBe("1,2,3,4,5");
  });

  test("Iterating empty binary tree", () => {
    const mockTree = jest.fn(() => new BinaryTree<number>([]));
    jest.mocked(generateTree).mockImplementationOnce(mockTree);

    const app = new App();
    const levelOrder = app.printLevelOrder();
    expect(levelOrder.length).toBe(0);
  });



  test("Iterating n-ary tree", () => {
    const NTREE = new Map([
      [0, [1, null, 2, 3]],
      [1, [4, 5]],
      [2, [6, null, 7]],
      [3, [8]],
    ]);
    //              0
    //   1      n       2      3
    // 4   5          6 n 7       8
    const mockTree = jest.fn(() => new MultinaryTree<number>(NTREE, 0));
    jest.mocked(generateTree).mockImplementationOnce(mockTree);

    const app = new App();
    const levelOrder = app.printLevelOrder();
    expect(levelOrder).toBe("0,1,2,3,4,5,6,7,8");
  });

  test("Iterating empty n-ary tree", () => {
    const mockTree = jest.fn(() => new MultinaryTree<number>(new Map(), null));
    jest.mocked(generateTree).mockImplementationOnce(mockTree);

    const app = new App();
    const levelOrder = app.printLevelOrder();
    expect(levelOrder.length).toBe(0);
  });
});
