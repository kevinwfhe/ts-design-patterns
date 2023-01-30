import { RoutingStrategy } from "./transport_strategy";

class Navigator {
  private strategy: RoutingStrategy;
  constructor() {}
  setStrategy(strategy: RoutingStrategy) {
    this.strategy = strategy;
  }
  execute(src: string, dest: string) {
    return this.strategy.buildRoute(src, dest);
  }
}

export { Navigator };
