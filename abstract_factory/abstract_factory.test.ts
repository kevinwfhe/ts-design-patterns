import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import { App } from "./use_case";
import { getOS } from "../factory_method/util";

beforeEach(() => {
  jest.restoreAllMocks();
});

jest.mock("../factory_method/util");

describe("Abstract factory", () => {
  test("Create Web UI", () => {
    const logSpy = jest.spyOn(console, "log");
    const mockGetOS = jest.fn(() => "Web");
    jest.mocked(getOS).mockImplementationOnce(mockGetOS);

    const app = new App();
    app.render();

    expect(logSpy).toBeCalledWith("Web button rendered");
    expect(logSpy).toBeCalledWith("Web input rendered");
    expect(logSpy).toBeCalledWith("Web paragraph rendered");
  });

  test("Create Mobile UI", () => {
    const logSpy = jest.spyOn(console, "log");
    const mockGetOS = jest.fn(() => "Mobile");
    jest.mocked(getOS).mockImplementationOnce(mockGetOS);

    const app = new App();
    app.render();

    expect(logSpy).toBeCalledWith("Mobile button rendered");
    expect(logSpy).toBeCalledWith("Mobile input rendered");
    expect(logSpy).toBeCalledWith("Mobile paragraph rendered");
  });
});
