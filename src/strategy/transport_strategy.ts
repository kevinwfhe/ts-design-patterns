abstract class RoutingStrategy {
  buildRoute: (src: string, dest: string) => void;
}

class ConcreteDrivingStrategy implements RoutingStrategy {
  buildRoute = (src: string, dest: string) => {
    console.log(`Driving ${src} -> ${dest}`);
  };
}

class ConcreteWalkingStrategy implements RoutingStrategy {
  buildRoute = (src: string, dest: string) => {
    console.log(`Walking ${src} -> ${dest}`);
  };
}

class ConcretePublicTranportStrategy implements RoutingStrategy {
  buildRoute = (src: string, dest: string) => {
    console.log(`Taking public transport ${src} -> ${dest}`);
  };
}

class ConcreteCarpoolStrategy implements RoutingStrategy {
  buildRoute = (src: string, dest: string) => {
    console.log(`Carpooling ${src} -> ${dest}`);
  };
}

export {
  RoutingStrategy,
  ConcreteDrivingStrategy,
  ConcreteWalkingStrategy,
  ConcretePublicTranportStrategy,
  ConcreteCarpoolStrategy,
};
