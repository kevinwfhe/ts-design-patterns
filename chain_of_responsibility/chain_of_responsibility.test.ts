import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { DB } from "./request_handler";
import { TooltipApp, ServerApp, UI, Config } from "./use_case";
import { getHoveredComponent, getIPBlackList } from "./utils";

jest.mock("./utils");
beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Chain of Responsibility - Tooltip Components", () => {
  test("Tooltip handled by the first component with tooltipText", () => {
    const logSpy = jest.spyOn(console, "log");

    const UI: UI = {
      type: "Modal",
      tooltip: "Tooltips from Modal_1",
      children: [
        {
          type: "Section",
          children: [
            //
            { type: "Button", tooltip: "Tooltips from Button_1" },
            { type: "Section" },
          ],
        },
        { type: "Button" },
        { type: "Modal" },
      ],
    };
    const app = new TooltipApp(UI);

    jest
      .mocked(getHoveredComponent)
      .mockImplementationOnce(jest.fn(() => [0, 0, 0]));
    app.onHover();
    expect(logSpy).toBeCalledWith("Tooltips from Button_1");

    jest
      .mocked(getHoveredComponent)
      .mockImplementationOnce(jest.fn(() => [0, 0]));
    app.onHover();
    expect(logSpy).toBeCalledWith("Tooltips from Modal_1");

    jest
      .mocked(getHoveredComponent)
      .mockImplementationOnce(jest.fn(() => [0, 1]));
    app.onHover();
    expect(logSpy).toBeCalledWith("Tooltips from Modal_1");

    jest
      .mocked(getHoveredComponent)
      .mockImplementationOnce(jest.fn(() => [0, 2]));
    app.onHover();
    expect(logSpy).toBeCalledWith("Tooltips from Modal_1");

    jest.mocked(getHoveredComponent).mockImplementationOnce(jest.fn(() => []));
    app.onHover();
    expect(logSpy).toBeCalledWith("Tooltips from App");
  });
});

describe("Chain of Responsiblity - Web Server - Config 1", () => {
  const db = new DB([
    ["red", 1],
    ["yellow", 2],
    ["green", 3],
    ["hat", 12.99],
    ["jacket", 99.99],
  ]);
  jest
    .mocked(getIPBlackList)
    .mockImplementationOnce(jest.fn(() => ["10.0.0.1", "99.9.99.9"]));
  const config1 = [Config.IPFilter, Config.Authorization, Config.Cache];
  const server1 = new ServerApp(config1, db);
  test("Valid IP - User - Non-Cached(hat) - 200(12.99)", () => {
    const response = server1.listen({
      ip: "127.0.0.1",
      role: "User",
      query: "hat",
    });
    expect(response.status).toBe(200);
    expect(response.result).toBe(12.99);
  });

  test("Blacklist IP - 403(IP Blocked)", () => {
    const response = server1.listen({
      ip: "10.0.0.1",
      role: "User",
      query: "red",
    });
    expect(response.status).toBe(403);
    expect(response.error).toBe("IP Blocked");
  });

  test("Valid IP - User - Cached(hat) - 304(12.99)", () => {
    const response = server1.listen({
      ip: "198.0.0.2",
      role: "User",
      query: "hat",
    });
    expect(response.status).toBe(304);
    expect(response.result).toBe(12.99);
  });

  test("Valid IP - Admin - Cached(hat) - 200(12.99)", () => {
    const response = server1.listen({
      ip: "9.9.9.9",
      role: "Admin",
      query: "hat",
    });
    expect(response.status).toBe(200);
    expect(response.result).toBe(12.99);
  });
});

describe("Chain of Responsiblity - Web Server - Config 2", () => {
  const db = new DB([
    ["red", 1],
    ["yellow", 2],
    ["green", 3],
    ["hat", 12.99],
    ["jacket", 99.99],
  ]);
  const config2 = [Config.Authorization, Config.Cache]; // no ip filter
  const server2 = new ServerApp(config2, db);
  test("Valid IP - User - Non-Cached(yellow) - 200(2)", () => {
    const response = server2.listen({
      ip: "127.0.0.1",
      role: "User",
      query: "yellow",
    });
    expect(response.status).toBe(200);
    expect(response.result).toBe(2);
  });

  test("Unvalid IP - User - Cached(yellow) - 304(2)", () => {
    const response = server2.listen({
      ip: "99.9.99.99",
      role: "User",
      query: "yellow",
    });
    expect(response.status).toBe(304);
    expect(response.result).toBe(2);
  });

  test("Unvalid IP - User - Non-Cached(blue) - 404(Not Found)", () => {
    const response = server2.listen({
      ip: "99.9.99.99",
      role: "User",
      query: "blue",
    });
    expect(response.status).toBe(404);
    expect(response.error).toBe("Not Found");
  });
});

describe("Chain of Responsiblity - Web Server - Internal Error", () => {
  test("Raise Internal From BaseHandler", () => {
    const config3 = [];
    const server3 = new ServerApp(config3, null as unknown as DB); // db not connected
    const response = server3.listen({
      ip: "127.0.0.1",
      role: "Admin",
      query: "yellow",
    });
    expect(response.status).toBe(500);
    expect(response.error).toBe("Internal Error");
  });

  test("Raise Internal From IPFilterHandler", () => {
    jest
      .mocked(getIPBlackList)
      .mockImplementationOnce(jest.fn(() => ["10.0.0.1", "99.9.99.9"]));
    const config4 = [Config.IPFilter];
    const server4 = new ServerApp(config4, null as unknown as DB); // db not connected
    const response = server4.listen({
      ip: "127.0.0.1",
      role: "Admin",
      query: "yellow",
    });
    expect(response.status).toBe(500);
    expect(response.error).toBe("Internal Error");
  });

  test("Raise Internal From AuthorizationHandler", () => {
    const config5 = [Config.Authorization];
    const server5 = new ServerApp(config5, null as unknown as DB); // db not connected
    const response = server5.listen({
      ip: "127.0.0.1",
      role: "Admin",
      query: "yellow",
    });
    expect(response.status).toBe(500);
    expect(response.error).toBe("Internal Error");
  });

  test("Raise Internal From CacheHandler", () => {
    const config6 = [Config.Cache];
    const server6 = new ServerApp(config6, null as unknown as DB); // db not connected
    const response = server6.listen({
      ip: "127.0.0.1",
      role: "Admin",
      query: "yellow",
    });
    expect(response.status).toBe(500);
    expect(response.error).toBe("Internal Error");
  });

  test("Valid IP - Admin - Cached(yellow) - 500(Internal Error) - DB Down", () => {
    const db = new DB([
      ["red", 1],
      ["yellow", 2],
      ["green", 3],
      ["hat", 12.99],
      ["jacket", 99.99],
    ]);
    const config = [Config.Authorization, Config.Cache]; // no ip filter
    const server = new ServerApp(config, db);
    db.down();
    const response = server.listen({
      ip: "127.0.0.1",
      role: "Admin",
      query: "yellow",
    });
    expect(response.status).toBe(500);
    expect(response.error).toBe("Internal Error");
  });
});
