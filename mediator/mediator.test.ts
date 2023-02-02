import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { InputButtonMediator } from "./mediator";

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Mediator", () => {
  const app = new InputButtonMediator();
  test("Buttons disabled when input is empty", () => {
    const logSpy = jest.spyOn(console, "log");
    app.clearButton.click();
    expect(logSpy).toBeCalledWith("can't click disabled clear button");
    app.confirmButton.click();
    expect(logSpy).toBeCalledWith("can't click disabled confirm button");
  });

  test("Buttons enabled if input is not empty", () => {
    const logSpy = jest.spyOn(console, "log");
    app.input.type("abc");
    expect(logSpy).toBeCalledWith("clear button is enabled");
    expect(logSpy).toBeCalledWith("confirm button is enabled");
  });

  test("Input cleared if clear button is clicked", () => {
    const logSpy = jest.spyOn(console, "log");
    app.input.type("abc");
    app.clearButton.click();
    expect(logSpy).toBeCalledWith("clear button is clicked");
    expect(logSpy).toBeCalledWith("input is cleared");
    expect(logSpy).toBeCalledWith("clear button is disabled");
  });

  test("Buttons disabled if input typed empty string", () => {
    const logSpy = jest.spyOn(console, "log");
    app.input.type("abc")
    expect(logSpy).toBeCalledWith("clear button is enabled");
    app.input.type("")
    expect(logSpy).toBeCalledWith("clear button is disabled");
  })

  test("Input validated if confirm button is clicked", () => {
    const logSpy = jest.spyOn(console, "log");
    app.input.type("abc123ABC");
    app.confirmButton.click();
    expect(logSpy).toBeCalledWith("input validated true");

    app.input.type("abc123!@#");
    app.confirmButton.click();
    console.log(logSpy)
    expect(logSpy).toHaveBeenCalledWith("input validated false");
  });
});
