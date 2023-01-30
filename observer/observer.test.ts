import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { OnlineStore } from "./subject";
import {
  OnSaleObserver,
  NewArrivalObserver,
  ShippingObserver,
} from "./observer";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Observer", () => {
  test("Subscribe and unsubscribe by single client", () => {
    const logSpy = jest.spyOn(console, "log");
    const store = new OnlineStore();
    const onSaleObsvrA = new OnSaleObserver("John");
    const newArrivalObsvrA = new NewArrivalObserver("John");
    const shippingObsvrA = new ShippingObserver("John");

    store.subscribe("ONSALE", onSaleObsvrA);
    store.subscribe("NEWARRIVAL", newArrivalObsvrA);
    store.subscribe("SHIPPED", shippingObsvrA);

    store.productOnSale("Chicken");
    expect(logSpy).toBeCalledWith(`Hey John, we've got Chicken on sale`);

    store.newArrival("Duck");
    expect(logSpy).toBeCalledWith(`Hey John, Duck is now available`);

    store.productShipped("Goose");
    expect(logSpy).toBeCalledWith(`Hey John, your Goose is out for delievery`);

    store.unsubscribe("NEWARRIVAL", newArrivalObsvrA);
    store.newArrival("Duck");
    expect(logSpy).toHaveBeenLastCalledWith(
      `Hey John, your Goose is out for delievery`
    );

    store.unsubscribe("NEWARRIVAL", newArrivalObsvrA);
  });

  test("Unsubscribe and notify before subscribe", () => {
    const logSpy = jest.spyOn(console, "log");
    const store = new OnlineStore();
    const onSaleObsvrA = new OnSaleObserver("John");

    store.productOnSale("Chicken");
    store.unsubscribe("ONSALE", onSaleObsvrA);

    expect(logSpy).toBeCalledTimes(0);
  });

  test("Subscribe and unsubscribe with multiple clients", () => {
    const logSpy = jest.spyOn(console, "log");
    const store = new OnlineStore();
    const onSaleObsvrA = new OnSaleObserver("John");
    const newArrivalObsvrA = new NewArrivalObserver("John");
    const shippingObsvrA = new ShippingObserver("John");
    const onSaleObsvrB = new OnSaleObserver("Doe");
    const newArrivalObsvrB = new NewArrivalObserver("Doe");
    const shippingObsvrB = new ShippingObserver("Doe");

    store.subscribe("ONSALE", onSaleObsvrA);
    store.subscribe("ONSALE", onSaleObsvrB);
    store.subscribe("NEWARRIVAL", newArrivalObsvrA);
    store.subscribe("SHIPPED", shippingObsvrB);
    // ONSALE: [John, Doe]
    // NEWARRIVAL: [John]
    // SHIPPED: [Doe]

    store.productOnSale("Chicken");
    expect(logSpy).toBeCalledWith("Hey John, we've got Chicken on sale");
    expect(logSpy).toBeCalledWith("Hey Doe, we've got Chicken on sale");

    store.newArrival("Duck");
    expect(logSpy).toBeCalledWith("Hey John, Duck is now available");

    store.productShipped("Goose");
    expect(logSpy).toBeCalledWith("Hey Doe, your Goose is out for delievery");

    store.unsubscribe("ONSALE", onSaleObsvrA);
    store.unsubscribe("ONSALE", onSaleObsvrB);
    store.unsubscribe("SHIPPED", shippingObsvrB);
    store.subscribe("SHIPPED", shippingObsvrA);
    store.subscribe("NEWARRIVAL", newArrivalObsvrB);
    // ONSALE: []
    // NEWARRIVAL: [John, Doe]
    // SHIPPED: [John]

    store.productOnSale("Chicken");
    expect(logSpy).toBeCalledTimes(4);

    store.newArrival("Lamb");
    expect(logSpy).toBeCalledWith("Hey John, Lamb is now available");
    expect(logSpy).toBeCalledWith("Hey Doe, Lamb is now available");

    store.productShipped("Beef");
    expect(logSpy).toBeCalledWith("Hey John, your Beef is out for delievery");
    expect(logSpy).toBeCalledTimes(7);
  });
});
