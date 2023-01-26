import { describe, expect, test } from "@jest/globals";
import { App } from "./use_case";

describe("Adapter", () => {
  const app = new App();
  test("Print json format string as json object", () => {
    const result = app.print(
      JSON.stringify({
        string: true,
        json: true,
      })
    );
    expect(result).toStrictEqual({
      string: true,
      json: true,
    });
  });

  test("Print non-json format string as json object", () => {
    const result = app.print("");
    expect(result).toStrictEqual({
      error: "Failed to parse string to json",
    });
  });

  test("Print even-length number as json", () => {
    const result = app.print(123456);
    expect(result).toStrictEqual({
      1: "2",
      3: "4",
      5: "6",
    });
  });

  test("Print odd-length number as json", () => {
    const result = app.print(12345);
    expect(result).toStrictEqual({
      1: "2",
      3: "4",
    });
  });
});
