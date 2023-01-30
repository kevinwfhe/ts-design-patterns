import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { Duck, Kitchen, Sink, Brush, Oven } from "./roast_duck_recipe";
import { RoastDuckRobot } from "./roast_duck_robot";

beforeEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("Facade", () => {
  test("Roast duck manually", () => {
    const logSpy = jest.spyOn(console, "log");
    
    const duck: Duck = {};
    const sink = new Sink();
    const washedDuck = sink.wash(duck);
    expect(logSpy).toBeCalledWith("Washing...");

    const kitchen = new Kitchen();
    const airdriedDuck = kitchen.airdry(washedDuck);
    expect(logSpy).toBeCalledWith("Air-drying...");

    const brush = new Brush();
    const seasonedDuck = brush.season(airdriedDuck);
    expect(logSpy).toBeCalledWith("Seasoning...");

    const stitchedDuck = kitchen.stitch(seasonedDuck);
    expect(logSpy).toBeCalledWith("Stitching...");

    const oven = new Oven();
    oven.preheat();
    expect(logSpy).toBeCalledWith("Preheating...");

    oven.roast(stitchedDuck);
    expect(logSpy).toBeCalledWith("Roasting...");
  });

  test("Roast duck with robot", () => {
    const logSpy = jest.spyOn(console, "log");
    const duck: Duck = {};
    const robot = new RoastDuckRobot();
    robot.start(duck);

    expect(logSpy).toHaveBeenCalledWith("Washing...");
    expect(logSpy).toHaveBeenCalledWith("Air-drying...");
    expect(logSpy).toHaveBeenCalledWith("Seasoning...");
    expect(logSpy).toHaveBeenCalledWith("Stitching...");
    expect(logSpy).toHaveBeenCalledWith("Preheating...");
    expect(logSpy).toHaveBeenCalledWith("Roasting...");
  });
});
