import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import { App } from "./use_case";

beforeEach(() => {
  jest.resetAllMocks();
});
describe("Decorator", () => {
  
  test("Notifier with no decorator", () => {
    const logSpy = jest.spyOn(console, "log");

    const config = new Map();
    config.set("InApp", ["Alice"]);
    const app = new App(config);

    app.scheduleChanged("msg_1");
    expect(logSpy).toBeCalledWith("Alice notified msg_1");
  });

  test("Notifier with decorators and new subjects", () => {
    const logSpy = jest.spyOn(console, "log");

    const config = new Map();
    config.set("InApp", ["Alice"]);
    config.set("Email", ["Bob"]);
    config.set("SMS", ["Cathy"]);
    config.set("Slack", ["David"]);
    const app = new App(config);

    app.scheduleChanged("msg_2");
    expect(logSpy).toBeCalledWith("Alice notified msg_2");
    expect(logSpy).toBeCalledWith("Bob notified by email msg_2");
    expect(logSpy).toBeCalledWith("Cathy notified by SMS msg_2");
    expect(logSpy).toBeCalledWith("David notified by Slack msg_2");
  });
});
