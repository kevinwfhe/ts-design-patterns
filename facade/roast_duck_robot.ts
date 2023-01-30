import { Duck, Kitchen, Sink, Brush, Oven } from "./roast_duck_recipe";

class RoastDuckRobot {
  constructor() {}
  start(duck: Duck) {
    const sink = new Sink();
    const washedDuck = sink.wash(duck);
    const kitchen = new Kitchen();
    const airdriedDuck = kitchen.airdry(washedDuck);
    const brush = new Brush();
    const seasonedDuck = brush.season(airdriedDuck);
    const stitchedDuck = kitchen.stitch(seasonedDuck);
    const oven = new Oven();
    oven.preheat();
    const roastedDuck = oven.roast(stitchedDuck);
    return roastedDuck;
  }
}

export { RoastDuckRobot };
