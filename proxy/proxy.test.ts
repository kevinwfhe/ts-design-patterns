import { describe, test, expect, jest } from "@jest/globals";
import { ProxyCache } from "./proxy_cache";
import { MemoryCache } from "./memory_cache";

describe("Proxy", () => {
  test("Custom proxy", () => {
    const logSpy = jest.spyOn(console, "log");

    const cache = new ProxyCache(new MemoryCache());
    cache.set("apple", 3);
    expect(logSpy).toBeCalledWith("Set apple to 3");
    cache.get("apple");
    expect(logSpy).toBeCalledWith("Get value of apple");
    cache.clear();
    expect(logSpy).toBeCalledWith("Clearing cache");
  });

  test("Built-in Proxy", () => {
    // Since ES6 there's a built-in 'Proxy' object, which
    // esentially implements the Proxy pattern in JavaScript world
    const logSpy = jest.spyOn(console, "log");

    const handlerFunction = {
      get(...argArray: any[]) {
        const [key] = argArray;
        console.log(`Get value of ${key}`);
      },
      set(...argArray: any[]) {
        const [key, value] = argArray;
        console.log(`Set ${key} to ${value}`);
      },
      clear(...argArray: any[]) {
        console.log("Clearing cache");
      },
    };

    const proxyHandler = {
      // To intercept a class method, one needs to first proxy 'get' operator,
      // because a class method is essentially a property of the object 
      // (the class instance). After we 'get' the method, we then proxy its 
      // internal 'apply' method, just like how we would proxy a normal function.
      get(target, prop) {
        if (typeof target[prop] === "function") {
          return new Proxy(target[prop], {
            apply(target, thisArg, argArray) {
              (handlerFunction[prop] as Function).apply(thisArg, argArray);
              return Reflect.apply(target, thisArg, argArray);
            },
          });
        } else {
          return Reflect.get(target, prop);
        }
      },
    };

    const cache = new Proxy(new MemoryCache(), proxyHandler);
    cache.set("apple", 3);
    expect(logSpy).toBeCalledWith("Set apple to 3");
    cache.get("apple");
    expect(logSpy).toBeCalledWith("Get value of apple");
    cache.clear();
    expect(logSpy).toBeCalledWith("Clearing cache");
  });
});
