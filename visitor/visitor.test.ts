import { describe, test, jest, expect } from "@jest/globals";
import { Visitor, ExportVisitor, ReviewsVisitor, GeneralVisitor } from "./visitor";
import {
  CommercialNode,
  IndustrialNode,
  MapNode,
  ResidentialNode,
} from "./map_node";

describe("Visitor", () => {
  const MOCK_MAP: MapNode[] = [
    new ResidentialNode({ address: "123 ABC" }),
    new CommercialNode({
      address: "456 DEF",
      name: "GHI Hotel",
    }).setReview(4),
    new CommercialNode({
      address: "789 JKL",
      name: "Yummy Restaurant",
    }).setReview(5),
    new IndustrialNode({ address: "234 LMN", name: "Funny Factory" }),
  ];

  test("Export locations to JSON", () => {
    const visitor = new ExportVisitor();
    const json = visitor.visit(MOCK_MAP);
    expect(json).toStrictEqual({
      "123 ABC": {},
      "456 DEF": { name: "GHI Hotel", review: 4 },
      "789 JKL": { name: "Yummy Restaurant", review: 5 },
      "234 LMN": { name: "Funny Factory" },
    });
  });

  test("Collect reviews", () => {
    const visitor = new ReviewsVisitor();
    const json = visitor.visit(MOCK_MAP);
    expect(json).toStrictEqual({
      "GHI Hotel": 4,
      "Yummy Restaurant": 5,
    });
  });

  test("General visitor to collect different fields from different nodes", () => {
    const addressToName = {};
    const visitor = new GeneralVisitor({
      ResidentialNode(node: ResidentialNode) {
        addressToName[node.address] = "*";
      },
      CommercialNode(node: CommercialNode) {
        const { address, review, name } = node;
        addressToName[address] = { name, review };
      },
      IndustrialNode(node: IndustrialNode) {
        addressToName[node.address] = node.name;
      },
    });
    visitor.visit(MOCK_MAP);
    expect(addressToName).toStrictEqual({
      "123 ABC": "*",
      "456 DEF": { name: "GHI Hotel", review: 4 },
      "789 JKL": { name: "Yummy Restaurant", review: 5 },
      "234 LMN": "Funny Factory",
    });
  });

  test("General visitor with traversing optional nodes", () => {
    const emptyObject = {};
    const visitor = new GeneralVisitor();
    visitor.visit(MOCK_MAP);
    expect(emptyObject).toStrictEqual({});
  });
});
