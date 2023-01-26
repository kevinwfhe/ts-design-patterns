import { Navigator } from "./navigator";
import {
  ConcreteDrivingStrategy,
  ConcreteWalkingStrategy,
  ConcretePublicTranportStrategy,
  ConcreteCarpoolStrategy,
} from "./transport_strategy";

class App {
  private navigator: Navigator;
  constructor() {
    this.navigator = new Navigator();
  }
  navigate(src: string, dest: string, method: string) {
    if (method === "Driving") {
      this.navigator.setStrategy(new ConcreteDrivingStrategy());
    } else if (method === "Walking") {
      this.navigator.setStrategy(new ConcreteWalkingStrategy());
    } else if (method === "PublicTransport") {
      this.navigator.setStrategy(new ConcretePublicTranportStrategy());
    } else if (method === "Carpool") {
      this.navigator.setStrategy(new ConcreteCarpoolStrategy());
    }
    this.navigator.execute(src, dest);
  }
}

export { App };
