import { Visitor } from "./visitor";

type MapNodeType = "CommercialNode" | "ResidentialNode" | "IndustrialNode";
type MapNodeClassType = CommercialNode | ResidentialNode |IndustrialNode
type ReviewType = null | 1 | 2 | 3 | 4 | 5;

abstract class MapNode {
  private static type: MapNodeType;
  address: string;
  abstract traverse: (visitor: Visitor) => void;
}

class CommercialNode implements MapNode {
  private static type = "Commercial";
  constructor({ name, address }: { name: string; address: string }) {
    this.name = name;
    this.address = address;
    this.review = null;
  }
  name: string;
  review: ReviewType;
  address: string;
  traverse(visitor: Visitor) {
    visitor.Commercial(this);
  }
  setReview(review: ReviewType) {
    this.review = review;
    return this;
  }
}

class ResidentialNode implements MapNode {
  private static type = "Residential";
  constructor({ address }: { address: string }) {
    this.address = address;
  }
  address: string;
  traverse(visitor: Visitor) {
    visitor.Residential(this);
  }
}

class IndustrialNode implements MapNode {
  private static type = "Industrial";
  constructor({ name, address }: { name: string; address: string }) {
    this.name = name;
    this.address = address;
  }
  name: string;
  address: string;
  traverse(visitor: Visitor) {
    visitor.Industrial(this);
  }
}

export {
  CommercialNode,
  ResidentialNode,
  IndustrialNode,
  MapNode,
  MapNodeType,
  MapNodeClassType
};
