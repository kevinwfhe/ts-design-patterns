import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { App } from "./use_case";
import { getOS } from "./util";

beforeEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

jest.mock("./util");

describe("Factory Method", () => {
  test("Create WebButton", () => {
    const logSpy = jest.spyOn(console, "log");
    const mockGetOS = jest.fn(() => "Web");
    jest.mocked(getOS).mockImplementationOnce(mockGetOS);

    const app = new App();
    app.initialize();
    app.render();
    
    expect(logSpy).toHaveBeenCalledWith("WebButton created");
    expect(logSpy).toHaveBeenCalledWith("Rendering WebButton");
  });

  test("Create MobileButton", () => {
    const logSpy = jest.spyOn(console, "log");
    const mockGetOS = jest.fn(() => "Mobile");
    jest.mocked(getOS).mockImplementationOnce(mockGetOS);

    const app = new App();
    app.initialize();
    app.render();

    expect(logSpy).toHaveBeenCalledWith("MobileButton created");
    expect(logSpy).toHaveBeenCalledWith("Rendering MobileButton");
  });
});
