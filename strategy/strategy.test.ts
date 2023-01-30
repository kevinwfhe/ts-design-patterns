import { describe, expect, test, jest } from "@jest/globals";
import { App } from "./use_case";

describe("Strategy", () => {
  const app = new App();

  test("Navigete with driving and then walking", () => {
    const logSpy = jest.spyOn(console, "log");

    app.navigate("SrcA", "DestA", "Driving");
    expect(logSpy).toBeCalledWith(`Driving SrcA -> DestA`);

    app.navigate("SrcA", "DestA", "Walking");
    expect(logSpy).toBeCalledWith(`Walking SrcA -> DestA`);
  });

  test("Navigete with public transport and then carpool", () => {
    const logSpy = jest.spyOn(console, "log");

    app.navigate("SrcB", "DestB", "PublicTransport");
    expect(logSpy).toBeCalledWith(`Taking public transport SrcB -> DestB`);

    app.navigate("SrcB", "DestC", "Carpool");
    expect(logSpy).toBeCalledWith(`Carpooling SrcB -> DestC`);
  });
});
