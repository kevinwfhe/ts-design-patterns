import {
  CommercialNode,
  IndustrialNode,
  MapNode,
  MapNodeType,
  ResidentialNode,
} from "./map_node";

type VisitorFunction = {
  ResidentialNode: (n: ResidentialNode) => void;
  CommercialNode: (n: CommercialNode) => void;
  IndustrialNode: (n: IndustrialNode) => void;
};

abstract class Visitor {
  abstract Residential(n: ResidentialNode): void;
  abstract Commercial(n: CommercialNode): void;
  abstract Industrial(n: IndustrialNode): void;
  abstract visit(nodes: MapNode[]): unknown;
}

// Visitor for general purpose
class GeneralVisitor extends Visitor {
  visit(nodes: MapNode[]): void {
    for (let node of nodes) {
      node.traverse(this);
    }
  }
  Residential: (node: ResidentialNode) => void;
  Commercial: (node: CommercialNode) => void;
  Industrial: (node: IndustrialNode) => void;
  constructor(funcs?: Partial<{ [key in MapNodeType]: VisitorFunction[key] }>) {
    super();
    this.Residential = funcs?.ResidentialNode ?? function () {};
    this.Commercial = funcs?.CommercialNode ?? function () {};
    this.Industrial = funcs?.IndustrialNode ?? function () {};
  }
}

class ExportVisitor implements Visitor {
  result = {};
  visit(nodes: MapNode[]) {
    for (let node of nodes) {
      node.traverse(this);
    }
    return this.result;
  }
  Residential(n: ResidentialNode): void {
    const { address, ...rest } = n;
    this.result[n.address] = { ...rest };
  }
  Commercial(n: CommercialNode): void {
    const { address, ...rest } = n;
    this.result[n.address] = { ...rest };
  }
  Industrial(n: IndustrialNode): void {
    const { address, ...rest } = n;
    this.result[n.address] = { ...rest };
  }
}

class ReviewsVisitor extends Visitor {
  result = {};
  visit(nodes: MapNode[]) {
    for (let node of nodes) {
      node.traverse(this);
    }
    return this.result;
  }
  Residential(n: ResidentialNode): void {}
  Commercial(n: CommercialNode): void {
    this.result[n.name] = n.review;
  }
  Industrial(n: IndustrialNode): void {}
}

// export { Visitor, ExportVisitor, ReviewsVisitor };
export { Visitor, GeneralVisitor, ExportVisitor, ReviewsVisitor };
